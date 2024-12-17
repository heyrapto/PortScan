const axios = require("axios");
const validator = require("validator");

// i need to confirm the url is valid
// i need to make sure it's a portfolio url

const validateUrl = async(req, res, next) => {
    const { url } = req.body;
    try{
        if(validator.isURL(url, { require_protocol: true })){
            next(); // if valid proceed
        } else{
            res.status(400).json({ success: false, message: 'URL is not valid and accessible' });
        }
    } catch(err){
        console.log(err)
    }
}

module.exports = validateUrl;