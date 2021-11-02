const signin = (req,res,database,bcrypt)=>{
    const {email,password} = req.body;
    if(!email || ! password){
        return res.status(400).json('Incorrect form submission!');
    }
    database.select('email','hash').from('login')
    .where({email})
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return database.select('*').from('users')
            .where({email})
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>res.status(400).json('Unable to get user'));
        }else{
            res.status(400).json('Wrong credentials');
        }
    })
    .catch(err=>res.status(400).json('Error signing in. Please check your credentials'));
}

export default signin;