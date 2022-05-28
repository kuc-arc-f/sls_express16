const express = require('express');
const router = express.Router();
require('dotenv').config();
const LibBook = require('../lib/LibBook');

/*****************************
index
******************************/
router.get('/index', async function(req, res, next) {
  try {
//    console.log("test");
    const items = await LibBook.getItems();
console.log(items);
    res.json({
      ret: 'OK, test2: ', data : items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
search
******************************/
router.post('/search', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);    
    const items = await LibBook.search(data);
console.log(items);
    res.json({
      ret: 'OK, search: ', data : items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
sort
******************************/
/*
router.get('/sort', async function(req, res, next) {
  try {
    const items = await LibBook.sort();
console.log(items);
    res.json({
      ret: 'OK, sort: ', data : items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
*/

/*****************************
add
******************************/
router.post('/add', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);     
    const result = await LibBook.addItem(data);
//console.log(result);
    res.json({ret: 'OK, add:', data : result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});

module.exports = router;

