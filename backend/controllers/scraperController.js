const express = require("express");

// cheerio - parser for html // jsdom - html and some js parser //

const scrapePortfolio = async(req, res) => {
    const { url } = await req.body;
    try{
    }
    catch(error){
        console.log("Cannot Scrape a non portfolio Website", error)
    }
}

module.exports = {scrapePortfolio};