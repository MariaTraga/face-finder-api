const profile = (req,res,database) =>{
    const {id} = req.params;
    database.select('*')
        .from('users')
        .where({id})
        .then(user=>{
            if(user.length){
                res.json(user[0]);
            }
            else{
                res.status(400).json('Not found');
            }  
        })
        .catch(err=> res.status(400).json('Error getting user'));
    // if(!found){
    //     res.status(404).json('no such user');
    // } 
}

export default profile;