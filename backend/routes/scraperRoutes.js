const express = require("express");
const router = express.Router();
const scraperController = require("../controllers/scraperController");

router.post("/", scraperController.scrapePortfolio);

module.exports = router;