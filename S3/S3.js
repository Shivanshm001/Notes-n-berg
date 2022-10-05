const { S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
// const randomFileName = (bytes) => { return crypto.randomBytes(bytes).toString('hex') }

// console.log(crypto.randomBytes(32).toString('hex'));
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});



module.exports = {
    s3,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    getSignedUrl
}