const axios = require("axios");

const validateUrl = async(req, res) => {
    const { url } = req.body;
    try{
        const response = await axios.head(url);
        res.status(200).json({ message: 'URL is valid and accessible' });
    } catch(err){
        console.log(err)
    }
}

module.exports = validateUrl;