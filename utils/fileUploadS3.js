const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require("multer-s3");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // store it in .env file to keep it safe
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: "us-east-1" 
})


const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: "winelight-staff-image", 
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});




module.exports = {
    s3Storage,
};