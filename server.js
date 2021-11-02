import express, { response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.js'
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';
import handleApiCall from './controllers/imageurl.js';

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'face-finder'
    }
});

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('Server working');
});

app.post('/signin', (req,res)=>{signin(req,res,database,bcrypt)});

app.post('/register', (req,res)=>{register(req,res,database,bcrypt)});

app.get('/profile/:id', (req,res)=>{profile(req,res,database)});

app.put('/image', (req,res)=>{image(req,res,database)});

app.post('/imageurl',(req,res)=>{handleApiCall(req,res)});

app.listen(PORT || 3000, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
