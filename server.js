const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const rootRouter = require('./routes/root');
const uploadRoute = require('./routes/upload');
const aboutRoute = require('./routes/about');
const connectDB = require('./db/connection');

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//MiddlewareStack
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Serving routes
app.use("/", rootRouter);
app.use("/about", aboutRoute);
app.use("/upload", uploadRoute);

//For any routes other than those above (needed to run react router);
app.use((req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "public", "index.html"));
})

const PORT = process.env.PORT || 5000;
async function start() {
    try {
        await connectDB(process.env.MONGO_URI_POSTS);
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();