import clarifai from 'clarifai';

const app = new clarifai.App({
    apiKey: process.env.API_CLARIFAI
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