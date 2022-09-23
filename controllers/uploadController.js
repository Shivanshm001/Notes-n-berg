
const { s3, s3Params, PutObjectCommand } = require('../S3/S3');
const Posts = require('../db/modles/postsModle');
const crypto = require('crypto');

//Creating randomFileName using crypto 
const randomFileName = () => crypto.randomBytes(32).toString('hex');



const uploadFile = async (req, res, next) => {
    const randKey = randomFileName();
    console.log(randKey);

    const { title, des,sem, type } = req.body;

    //Params required for making put request to AWS S3
    const putParams = {
        ...s3Params,
        Key: randKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(putParams);
    await s3.send(command)

    //Data for the POSTS_MODLE for mongoose.
    const postCreateData = {
        title: title,
        des: des,
        content: {
            rand_name_key: randKey,
            filetype: putParams.ContentType
        },
        tags: {
            sem: sem,
            type: type
        }
    }

    //Creating a new document in mongo with the given parameters
    const post = Posts.create(postCreateData
            ,(err) => {
        if (err) return console.log(err)
    })

    res.status(200).json({ success: true, post: post });
    next();
}


const uploadLink = async (req, res, next) => {
    const { link, title, des } = req.body;
    console.log(link, title, des);
    res.json({ success: true });
    next();
}
module.exports = {
    uploadFile,
    uploadLink
}