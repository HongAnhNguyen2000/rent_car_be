const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

exports.awsPutObject = async (key, body) => {
    try {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const region = process.env.AWS_REGION;
        const bucket = process.env.AWS_BUCKET;
        const parallelUploads3 = new Upload({
          client: new S3Client({
              credentials: {
                accessKeyId,
                secretAccessKey
              },
              region
          }),
          params: {
              ACL: 'public-read',
              Bucket: bucket,
              Key: key,
              Body: body
          },      
          tags: [],
          queueSize: 4,
          partSize: 1024 * 1024 * 5, // in bytes, at least 5MB
          leavePartsOnError: false,
        });
        await parallelUploads3.done();
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    } catch (e) {
      throw e;
    }
};