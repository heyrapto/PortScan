const { chromium } = require("playwright");

const imageOptimizationMetrics = async (url) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Object to stor image load times
    const imageLoadTime = [];

    // Listen to the response event for image resources
    page.on('response', (response) => {
        if(response.request().resourceType() === 'image'){
            const imageUrl = response.url();
            const imageSize = response.headers()['content-length']; // In bytes

            // Log the image URL and its size
            imageLoadTime.push({ url: imageUrl, size: imageSize })
        }
    });

    await page.goto(url, { waitUntil: 'load' });

    console.log("Image load times and sizes:");
    imageLoadTime.forEach(img => {
        console.log(`Image URL: ${img.url}, Size: ${(img.size / 1024).toFixed(2)} KB`)
    })

    await browser.close();
    return imageLoadTime;
}

module.exports = { imageOptimizationMetrics };