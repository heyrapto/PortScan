const { chromium } = require("playwright");

const performanceMetrics = async (url) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Start collecting performance metrics
    const [metrics] = await Promise.all([
        page.on('load', () => {}), // Triggered when the page is loaded
        page.goto(url, {waitUntil: "load"}), // Waiting for the load event
    ])

    // Retrieve performance metrics from the page
    const performance = await page.evaluate(() => JSON.stringify(window.performance.toJSON()));
    const { timing } = JSON.parse(performance)
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domContentLoadTime = timing.domContentLoaded - timing.navigationStart;

    console.log(`Page Load Time: ${loadTime}`);
    console.log(`DOM Content Loaded: ${domContentLoadTime}`);

    const performanceData = {
        pageLoadTime: `Page Load Time: ${loadTime}`,
        domContentLoaded: `DOM Content Loaded: ${domContentLoadTime}`,
    }

    await browser.close();
    return performanceData;
}

module.exports = { performanceMetrics }