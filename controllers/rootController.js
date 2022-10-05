const Posts = require('../db/modles/postsModle');
const { s3, getSignedUrl, GetObjectCommand, DeleteObjectCommand } = require('../S3/S3');



const getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Posts.find({}).sort("title");
    } catch (error) {
        console.log(error);
    }
    for (const post of posts) {
        const getParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: post.content.rand_name_key,
            ResponseContentDisposition: 'attachment',
        }
        const command = new GetObjectCommand(getParams);
       try {
        const fileUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })   
        post.content.url = fileUrl;
       } catch (error) {
        console.log(error)
       }
    }
    res.status(200).send(posts);
}

const deleteSinglePost = async (req, res) => {
    try {
        const post = await Posts.findOne({ "content.rand_name_key": req.params.id });
        if (!post) {
            console.log("Post not found");
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const delParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: post.content.rand_name_key,
        }
        const command = new DeleteObjectCommand(delParams);
        await s3.send(command);

        await Posts.deleteOne({ "content.rand_name_key": req.params.id });
        res.status(200).send({ message: "Deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error." });
    }
}

module.exports = {
    getAllPosts,
    deleteSinglePost,
}