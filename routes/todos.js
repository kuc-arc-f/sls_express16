const express = require('express');
const router = express.Router();
require('dotenv').config();
const LibTodo = require('../lib/LibTodo');

/*****************************
index
******************************/
router.get('/index', async function(req, res, next) {
  try {
    console.log("test");
    const items = await LibTodo.getItems();
//console.log(JSON.stringify(items));
    res.json({
      ret: 'OK, test2: ', data : items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
show
******************************/
router.post('/show', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);      
    const items = await LibTodo.getTodo(data);
//console.log(JSON.stringify(items));
    res.json({
      ret: 'OK, test2: ', data : items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
add
******************************/
router.post('/add', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);     
    const result = await LibTodo.addItem(data);
//console.log(result);
    res.json({ret: 'OK, add:', data : result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
update
******************************/
router.post('/update', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);     
    const result = await LibTodo.updateItem(data);
//console.log(result);
    res.json({ret: 'OK, update:', data : result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
delete
******************************/
router.post('/delete', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);     
    const result = await LibTodo.deleteItem(data);
//console.log(result);
    res.json({ret: 'OK, delete:', data : result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});

module.exports = router;

