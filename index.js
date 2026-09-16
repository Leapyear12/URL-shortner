const express = require('express');
const path = require('path');
const app = express();
const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
const PORT =8001;

app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://localhost:27017/url-short-url")
.then(() => console.log("Connected to MongoDB"));

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

//app.use(express.json());

app.use("/url", urlRoute);
app.use("/",staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) return res.status(404).send('Short URL not found');
    res.redirect(entry.redirectUrl);
});
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});