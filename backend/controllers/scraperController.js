const express = require("express");

const scrapePortfolio = (req, res) => {
    const { url } = req.body;
    try{
    }
    catch(error){
        console.log("Cannot Scrape a non portfolio Website", error)
    }
}

module.exports = {scrapePortfolio};