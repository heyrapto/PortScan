const { chromium } = require("playwright");

const performanceMetrics = async (url) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const [metrics] = await Promise.all([
        page.on('load', () => {}), 
        page.goto(url, {waitUntil: "load"}), 
    ])
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