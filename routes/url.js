const express = require('express');
const {handelGeneratreShortUrl,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', handelGeneratreShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;