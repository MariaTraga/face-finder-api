const register = (req,res,database,bcrypt) =>{

    const {email,name,password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission!');
    } 
    const hash = bcrypt.hashSync(password,10);
    database.transaction(trx=>{
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            trx.insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .into('users')
            .returning('*')
            .then(user=>res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('Unable to register'));
    
}

export default register;