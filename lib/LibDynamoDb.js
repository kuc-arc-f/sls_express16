
const AWS = require('aws-sdk');

module.exports.getClient =  () => {
console.log("IS_OFFLINE= ", process.env.IS_OFFLINE);
    const dynamodb = process.env.IS_OFFLINE
    ? new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        })
    : new AWS.DynamoDB.DocumentClient();
    return dynamodb;
  };
  