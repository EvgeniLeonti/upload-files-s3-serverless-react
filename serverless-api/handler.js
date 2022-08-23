const serverless = require("serverless-http");
const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(fileUpload({}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const AWS = require('aws-sdk');
const BUCKET = process.env.BUCKET;

const s3 = new AWS.S3();

const uploadFile = async (filename, mimeType, data) => {
  console.log('upload file', filename, 'to bucket ', BUCKET)
  const key = `${new Date().valueOf()}-${filename}`;
  const params = { Bucket: BUCKET, Key: key, ACL: 'public-read', Body: data, ContentType: mimeType };
  const result = await s3.putObject(params).promise();
  const link = `https://${BUCKET}.s3.amazonaws.com/${key}`;
  return {
    filename,
    link
  };
}

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/upload", async (req, res) => {
  const files = {};
  for (const key of Object.keys(req.files)) {
    const file = req.files[key];
    files[key] = await uploadFile(file.name, file.mimetype, file.data);
  }
  return res.status(200).json({files});
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});



module.exports.handler = serverless(app);

