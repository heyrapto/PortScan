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
    const { url } = req.body;
    if(!url) return res.status(500).json({ message: "Input a URL "})
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto(url, { waitUntil: "networkidle" });

        // Extract Title
        const title = await page.title();
        
        // Extract Meta Tags (description and keywords)
        const metaTags = await page.$$eval('meta', (metas) => {
            const metaObj = {};
            metas.forEach(meta => {
                const name = meta.getAttribute('name') || meta.getAttribute('property');
                if (name) {
                    metaObj[name.toLowerCase()] = meta.getAttribute('content');
                }
            });
            return metaObj;
        });

        // Extract <a> tags
        const links = await page.$$eval('a', anchors => anchors.map(a => a.href).filter(href => href));
        const linkCount = links.length;

        // Extract <div> and <section> counts
        const divCount = await page.locator('div').count();
        const sectionCount = await page.locator('section').count();

        // Extract <h1>, <p> tags
        const h1Tags = await page.$$eval('h1', h1s => h1s.map(h1 => h1.textContent.trim()));
        const pTags = await page.$$eval('p', ps => ps.map(p => p.textContent.trim()));

        // Extract Images and Alt attributes
        const imgAlts = await page.$$eval('img', imgs => imgs.map(img => ({
            src: img.src,
            alt: img.alt || "No alt attribute"
        })));

        // Check URL format
        const isValidURL = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url);

        // Site Speed and Image Optimization
        const imageData = await imageOptimizationMetrics(url);
        const performanceData = await performanceMetrics(url);

        // Construct Response
        res.status(200).json({
            message: "Successfully Scraped",
            seo: {
                title: title || "No title tag",
                meta: metaTags,
                isTitleUniqueAndDescriptive: title.length > 10, // Example check
                isMetaDescriptionValid: metaTags['description'] && metaTags['description'].length >= 160,
                isURLValid: isValidURL
            },
            content: {
                h1Tags,
                pTagsCount: pTags.length,
                divCount,
                sectionCount
            },
            links: {
                totalLinks: linkCount,
                links
            },
            images: {
                totalImages: imgAlts.length,
                altAttributes: imgAlts
            },
            performance: performanceData,
            imageOptimization: imageData,
            suggestions: [
                linkCount >= 10 ? "Sufficient project links are present" : "Add more project links (>= 10)",
                divCount <= 5 ? "Web page has minimal content" : "Consider reducing <div> tags for simplicity",
                h1Tags.length > 0 ? "H1 tags found" : "Add descriptive H1 tags for better SEO",
                isValidURL ? "URL format is valid" : "Ensure URL follows correct format e.g., https://example.com"
            ]
        });

    } catch (error) {
        console.error("Error scraping portfolio:", error);
        res.status(500).json({ error: "Error scraping portfolio", details: error.message });
    } finally {
        await browser.close();
    }
};

module.exports = { scrapePortfolio };
