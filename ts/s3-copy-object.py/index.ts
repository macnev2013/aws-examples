var AWS = require('aws-sdk');

const bucketName = "test";
const srcKey = "media/event/asdasd/image/asdasd-f5e135d97374/large";
const dstKey = "media/event/asdasd/image/asdasd-f5e135d97374/large-copy";
const region = "us-east-2";

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'test',
  secretAccessKey: 'test',
  endpoint: "http://s3.localhost.localstack.cloud:4566",
  s3ForcePathStyle: false,
});

const createBucketParams = {
  Bucket: bucketName,
  CreateBucketConfiguration: {
    LocationConstraint: region
  }
};

const putObjectParams = {
  Bucket: bucketName,
  Key: srcKey,
  Body: "test"
};

const copyObjectParams = {
  Bucket: bucketName,
  CopySource: encodeURI(`${bucketName}/${srcKey}`),
  Key: dstKey,
  ACL: 'private',
  CacheControl: 'max-age=2629746'
};

async function s3CopyObject() {
  const createRes = await s3.createBucket(createBucketParams).promise()
  console.log("Create bucket: ", createRes);
  const putRes = await s3.putObject(putObjectParams).promise()
  console.log("Put object: ", putRes);
  const copyRes = await s3.copyObject(copyObjectParams).promise()
  console.log("Copy object: ", copyRes);
}

s3CopyObject();
