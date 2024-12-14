const validateUrl = (req, res) => {
    const { url } = req.body;
    const validate = new URL(url);
}

module.exports = validateUrl;