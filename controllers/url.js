const shortid = require("shortid");
const URL = require("../models/url");

async function handelGeneratreShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    
    const allUrls = await URL.find({});
    return res.render('home', {
        id: shortId,
        urls: allUrls,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: "URL not found" });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handelGeneratreShortUrl,
    handleGetAnalytics,
};