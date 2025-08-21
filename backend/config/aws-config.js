require('dotenv').config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  s3ForcePathStyle: false,
  signatureVersion: "v4"
});

const s3 = new AWS.S3();
const S3_BUCKET = process.env.R2_BUCKET_NAME;

module.exports = { s3, S3_BUCKET };
