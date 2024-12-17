const { chromium } = require("playwright");
const { imageOptimizationMetrics } = require("../utils/imageOptimization");
const { performanceMetrics } = require("../utils/siteSpeed");

// i need to extract the meta tags to track SEO
// track alt attributes
// i need to extract the link <a> to track if there's enough project links ( >= 10 )
// i need to extract the <div> tag to track if there's enough contents on the web page ( <= 5 per page )
// i need to extract the h1 and p tags to check if there's enough text content in the web page to better describe the owner of the portfolio for potential clients
// SEO
   // 1. check title tags
   // 2. meta description 
   // 3. meta keywords
   // 4. title tag should be unique and descriptive
   // 5. meta description should be at least 160 characters and should be concise and relevant to the page content
   // 6. Check URL structure e.g (https://hi.com) is correct format
   // 7. check site speed ( how fast the page loads)
   // 8. track image optimization ( monitor individual loading time );
   // 9. Tell Users the best practices, suggestions and critics

const scrapePortfolio = async (req, res) => {
    try{
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const { url } = req.body;
    await page.goto(url)

    // Extract meta tags
    const metaTags = await page.$$eval('meta', metas => metas.map(meta => meta.getAttribute('name') && meta.getAttribute('name').toLowerCase() === 'description'? meta.getAttribute('content') : null));
    console.log("Meta tags:", metaTags);

    // Extract link a tags
    const aTags = await page.locator('a').evaluateAll(anchors => anchors.map(a => a.href));
    const aCount = await page.locator('a').count();
    console.log("Links:", aTags);

    // Extract div tags
    const divTags = page.locator('div').count();
    const sectionTags = page.locator('section').count();

    // Extract alt attributes
    const h1Tags = page.locator('h1').getByAltText();
    const h2Tags = page.locator('h2').getByAltText();
    const h3Tags = page.locator('h3').getByAltText();
    const pTags = page.locator('p').getByAltText();
    const imgTags = page.locator('img').getByAltText();

    // titleTags
    const titleTags = page.locator('title').evaluateAll(anchors => anchors.map(title => title));
    const imageData = await imageOptimizationMetrics(url);
    const performanceData = await performanceMetrics(url);
    res.status(204).json({
        message: "Successfully Scraped",
        image: imageData,
        performance: performanceData,
    });
    // Create pages, interact with UI elements, assert values
    await browser.close();
    } catch (error) {
        console.error("Error scraping portfolio:", error);
        res.status(500).send("Error scraping portfolio");
    }
}

module.exports = {scrapePortfolio};