require('dotenv').config();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const LibDynamoDb = require('./LibDynamoDb');
//const LibCommon = require('./LibCommon');
const dynamoDb = LibDynamoDb.getClient();

const  LibBook = {
  /*****************************
  getItems
  ******************************/
  getItems: async function(){
    const params = {
      TableName: 'books',
    };
    const scanItems= await dynamoDb.scan(params).promise();
    return scanItems.Items;     
  },
  /*****************************
  search
  ******************************/
  search: async function(data){
    const params = {
      TableName : "books",
      FilterExpression : "book_type = :val",
      ExpressionAttributeValues : {":val" : data.book_type }
    };
    const scanItems= await dynamoDb.scan(params).promise();
     return scanItems.Items;
  },
  /*****************************
  sort
  ******************************/
 /*
  sort: async function(){
    const params = {
      TableName: 'books',
      KeyConditionExpression: '#key = :str',
      ExpressionAttributeNames: { '#key': 'id' },
      ExpressionAttributeValues: { ':str': '11' },
      ScanIndexForward: false
    }    
    dynamoDb.query(params, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });    
    return [];
  },  
 */
  /*****************************
  addItem
  ******************************/  
  addItem: async function(data){
    const params = {
      TableName: 'books',
      Item: {
        id: uuid.v1(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        title: data.title,
        book_type : data.book_type,
      }
    };
    return await dynamoDb.put(params).promise()
    .then(() => {
      return params.Item;
    })
    .catch((err) => {
      throw new Error('Error , addItem');
    });    
  },  

}
module.exports = LibBook;
/*
dynamoDb.scan(params, function(err, data) {
  if (err) {
    console.error(err);
    throw new Error('Error , search');
  } else {
    console.log(data);
    return data;
  }
});    
*/