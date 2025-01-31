const { chromium } = require("playwright");
const { imageOptimizationMetrics } = require("../utils/imageOptimization");
const { performanceMetrics } = require("../utils/siteSpeed");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC6psnET5Eib_ALt89hSU_yoJ85oUSaaG8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const parseFeedback = (text) => {
  const sections = text.split(/\n\s*\n/);
  const result = {
    suggestions: [],
    critiques: [],
    bestPractices: []
  };

  let currentSection = null;
  const sectionPatterns = {
    suggestions: /suggestions? for improvement/i,
    critiques: /critiques?/i,
    bestPractices: /best practices? for portfolio development/i
  };

  sections.forEach(section => {
    const cleanSection = section.trim();
    
    for (const [sectionName, pattern] of Object.entries(sectionPatterns)) {
      if (cleanSection.match(pattern)) {
        currentSection = sectionName;
        return;
      }
    }

    if (currentSection && cleanSection) {
      const items = cleanSection.split('\n')
        .map(item => item.replace(/^\s*[-•*]\s*|\d+\.\s*/, '').trim())
        .filter(item => item.length > 0);
      
      result[currentSection].push(...items);
    }
  });

  return result;
};

const scrapePortfolio = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Input a valid URL" });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle" });

    const [metaTags, links, divCount, sectionCount, h1Tags, pTags, imgAlts] = await Promise.all([
      page.$$eval('meta', metas => {
        const metaObj = {};
        metas.forEach(meta => {
          const name = meta.getAttribute('name') || meta.getAttribute('property');
          if (name) metaObj[name.toLowerCase()] = meta.getAttribute('content');
        });
        return metaObj;
      }),
      page.$$eval('a', anchors => anchors.map(a => a.href).filter(href => href)),
      page.locator('div').count(),
      page.locator('section').count(),
      page.$$eval('h1', h1s => h1s.map(h1 => h1.textContent.trim())),
      page.$$eval('p', ps => ps.map(p => p.textContent.trim())),
      page.$$eval('img', imgs => imgs.map(img => ({
        src: img.src,
        alt: img.alt || "No alt attribute"
      })))
    ]);

    const [imageData, performanceData] = await Promise.all([
      imageOptimizationMetrics(url),
      performanceMetrics(url)
    ]);

    const metrics = {
      linkCount: links.length,
      divCount,
      sectionCount,
      h1TagsCount: h1Tags.length,
      pTagsCount: pTags.length,
      imgAltCount: imgAlts.filter(img => img.alt !== "No alt attribute").length,
      performance: performanceData,
      isValidURL: /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url),
    };

    const prompt = `Based on these metrics: ${JSON.stringify(metrics, null, 2)}
      Provide structured feedback in these exact categories:
      1. Suggestions for Improvement
      2. Critiques
      3. Best Practices for Portfolio Development
      Format: Clean bullet points without any markdown or numbering.`;
    
    const result = await model.generateContent(prompt);
    const feedbackText = (await result.response.text()).replace(/\*/g, "").trim();
    
    console.log("Raw Feedback:", feedbackText);
    const parsedFeedback = parseFeedback(feedbackText);
    console.log("Parsed Feedback:", parsedFeedback);

    const hireableScore = Math.min(
      (metrics.linkCount * 1.0 +  
       metrics.h1TagsCount * 2.0 +  
       metrics.pTagsCount * 1.5 +  
       metrics.imgAltCount * 2.5) / 2, 
      100
    );

    const response = {
      success: true,
      suggestions: parsedFeedback.suggestions,
      critiques: parsedFeedback.critiques,
      bestPractices: parsedFeedback.bestPractices,
      hireablePercentage: hireableScore.toFixed(2),
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({
      success: false,
      error: "Analysis failed",
      details: error.message
    });
  } finally {
    await browser.close();
  }
};

module.exports = { scrapePortfolio };