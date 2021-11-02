import clarifai from 'clarifai';

const app = new clarifai.App({
    apiKey: '0da3d99802ab43bab806ee7a57aaf7f6'
});

const handleApiCall = (req,res)=>{
    app.models.predict(
        // 'f76196b43bbd45c99b4f3cd8e8b40a8a',
        clarifai.FACE_DETECT_MODEL,
        req.body.input)
    .then(data => res.json(data))
    .catch(err=>res.status(400).json('Unable to work with API'));
}

export default handleApiCall;