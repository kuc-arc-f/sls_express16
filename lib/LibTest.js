require('dotenv').config();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const LibDynamoDb = require('./LibDynamoDb');
//const LibCommon = require('./LibCommon');
const dynamoDb = LibDynamoDb.getClient();

const  LibTest = {
  /*****************************
  getItems
  ******************************/
  getItems: async function(){
    const params = {
      TableName: 'todos',
    };
    const scanItems= await dynamoDb.scan(params).promise();
    return scanItems.Items;     
  },
  /*****************************
  addItem
  ******************************/  
  addItem: async function(data){
    const params = {
      TableName: 'todos',
      Item: {
        id: uuid.v1(),
        updatedAt: new Date().getTime(),
        body: data.body,
      }
    };
    return await dynamoDb.put(params).promise()
    .then(() => {
      return params.Item;
      /*
        return {
          statusCode: 200,
          body: JSON.stringify("OK"),
        };
      */
    })
    .catch((err) => {
      throw new Error('Error , addItem');
    });    
  },  
}
module.exports = LibTest;