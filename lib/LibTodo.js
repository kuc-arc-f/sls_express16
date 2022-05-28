require('dotenv').config();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const LibDynamoDb = require('./LibDynamoDb');
//const LibCommon = require('./LibCommon');
const dynamoDb = LibDynamoDb.getClient();

const  LibTodo = {
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
  getTodo
  ******************************/
  getTodo: async function(data){
    const params = {
      TableName: 'todos',
      Key: {
        id: data.id
      }
    };
    const scanItems= await dynamoDb.get(params).promise();
    return scanItems.Item;     
  },   
  /*****************************
  addItem
  ******************************/  
  addItem: async function(data){
    const params = {
      TableName: 'todos',
      Item: {
        id: uuid.v1(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        title: data.title,
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
  /*****************************
  updateItem
  ******************************/  
  updateItem: async function(data){
    const params = {
      TableName: 'todos',
      Item: {
        id: data.id,
        updatedAt: new Date().getTime(),
        title: data.title,
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
  /*****************************
  deleteItem
  ******************************/  
  deleteItem: async function(data){
console.log(data);
    const params = {
      TableName: 'todos',
      Key: {
        id: data.id
      }
    };    
    return await dynamoDb.delete(params).promise()
    .then(() => {
      return params.Key;
    })
    .catch((err) => {
      throw new Error('Error , deleteItem');
    });    
  },  
}
module.exports = LibTodo;
