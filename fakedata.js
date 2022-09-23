require('dotenv').config();

const connectDB = require('./db/connection');
const File = require('./db/modles/postsModle');
const jsonProduct = require('./rawData.json');


async function start() {
    try {
        await connectDB(process.env.MONGO_URI_TEST)
        await File.deleteMany();
        await File.create(jsonProduct);
        console.log("Successfully connected");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();