
const image = (req,res,database) => {
    const {id} = req.body;
    database('users').where({id})
        .increment('entries',1)
        .returning('entries')
        .then(entries=>res.json(entries[0]))
        .catch(err=> res.status(400).json('Error getting entries'));
}

export default image;