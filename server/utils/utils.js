const AWS = require("aws-sdk");
const axios = require("axios");
const stream = require("stream");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

const scanUrlsForFiles = async (fileUrls, userId) => {
  try {
    const fileLinks = [];
    for (const fileUrl of fileUrls) {
      const fileName = fileUrl.split("/").pop();
      console.log("fileName", fileName);

      const result = await uploadToS3(fileUrl, fileName, userId);
      fileLinks.push(result.Location);
    }
    return fileLinks;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadToS3 = async (url, fileName, userId) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = response.data;

  const readableStream = new stream.Readable();
  readableStream.push(buffer);
  readableStream.push(null);

  const s3UploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${userId}/${fileName}`,
    Body: readableStream,
  };

  return s3.upload(s3UploadParams).promise();
};

module.exports = {
  scanUrlsForFiles,
  uploadToS3,
};
