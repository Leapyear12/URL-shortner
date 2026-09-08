const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
const PORT =8001;

connectToMongoDB("mongodb://localhost:27017/url-short-url")
.then(() => console.log("Connected to MongoDB"));

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ 
        shortId 
    },
    { 
        $push: {
           visitHistory: {timestamp: Date.now()},
        },
    });
    res.redirect(entry.redirectUrl);
});
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});