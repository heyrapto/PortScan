const { chromium } = require("playwright");
const { imageOptimizationMetrics } = require("../utils/imageOptimization");
const { performanceMetrics } = require("../utils/siteSpeed");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC6psnET5Eib_ALt89hSU_yoJ85oUSaaG8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const scrapePortfolio = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(500).json({ message: "Input a URL" });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle" });

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

    const links = await page.$$eval('a', anchors => anchors.map(a => a.href).filter(href => href));
    const linkCount = links.length;

    const divCount = await page.locator('div').count();
    const sectionCount = await page.locator('section').count();

    const h1Tags = await page.$$eval('h1', h1s => h1s.map(h1 => h1.textContent.trim()));
    const pTags = await page.$$eval('p', ps => ps.map(p => p.textContent.trim()));

    const imgAlts = await page.$$eval('img', imgs => imgs.map(img => ({
      src: img.src,
      alt: img.alt || "No alt attribute"
    })));

    const isValidURL = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url);

    const imageData = await imageOptimizationMetrics(url);
    const performanceData = await performanceMetrics(url);

    const metrics = {
      linkCount,
      divCount,
      sectionCount,
      h1TagsCount: h1Tags.length,
      pTagsCount: pTags.length,
      imgAltCount: imgAlts.filter(img => img.alt !== "No alt attribute").length,
      performance: performanceData,
      isValidURL,
    };

    const prompt = `
      Based on the following metrics:
      - Link Count: ${metrics.linkCount}
      - Div Count: ${metrics.divCount}
      - Section Count: ${metrics.sectionCount}
      - H1 Tags Count: ${metrics.h1TagsCount}
      - Paragraph Tags Count: ${metrics.pTagsCount}
      - Image Alt Count: ${metrics.imgAltCount}
      - Page Load Time: ${metrics.performance.pageLoadTime}ms
      - DOM Content Loaded: ${metrics.performance.domContentLoaded}ms
      - URL Format Valid: ${metrics.isValidURL}
      
      Provide feedback in three distinct categories:
      1. Suggestions for Improvement: Provide actionable suggestions.
      2. Critiques: Provide critical analysis based on the metrics and performance.
      3. Best Practices for Portfolio Development: Share industry best practices.

      Format the response cleanly, without any introductory lines or placeholders. Only include actionable content under each category.
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    const feedbackText = result.response.text();
    const feedbackArray = feedbackText.split("\n");

    const cleanedSuggestions = feedbackArray.filter(item => item.trim() && item.toLowerCase().includes("suggestion"));
    const cleanedCritiques = feedbackArray.filter(item => item.trim() && item.toLowerCase().includes("critique"));
    const cleanedBestPractices = feedbackArray.filter(item => item.trim() && item.toLowerCase().includes("best practice"));

    const hireableScore = (metrics.linkCount + metrics.divCount + metrics.sectionCount + metrics.h1TagsCount + metrics.pTagsCount + metrics.imgAltCount) / 6;
    const hireablePercentage = Math.min(Math.max(hireableScore, 0), 100);

    const results = {
      feedback: [
        { category: "Suggestions", items: cleanedSuggestions },
        { category: "Critiques", items: cleanedCritiques },
        { category: "Best Practices", items: cleanedBestPractices },
      ],
      hireablePercentage: hireablePercentage.toFixed(2) + "%",
    };

    res.status(200).json(results);

  } catch (error) {
    console.error("Error scraping portfolio:", error.stack);
    res.status(500).json({ error: "Error scraping portfolio", details: error.message });
  } finally {
    await browser.close();
  }
};

module.exports = { scrapePortfolio };
