const express = require('express');
const router = express.Router();
require('dotenv').config();
const LibTest = require('../lib/LibTest');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("root");
  res.json({ret: 'root OK'});
});
/*****************************
test
******************************/
router.get('/test', function(req, res, next) {
  console.log("test");
  res.json({
    ret: 'OK',
//    data: process.env.POSTGRES_DATABASE + ':' + process.env.POSTGRES_HOST,
  });
});
/*****************************
test2
******************************/
router.get('/test2', async function(req, res, next) {
  try {
    console.log("test");
    const items = await LibTest.getItems();
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
test3
******************************/
router.post('/test3', function(req, res, next) {
  console.log("test");
  const data = JSON.parse(req.apiGateway.event.body);
console.log(data);  
  res.json({ret: 'OK, test3'});
});
/*****************************
test4
******************************/
router.post('/test4', async function(req, res, next) {
  try {
    const data = JSON.parse(req.apiGateway.event.body);
console.log(data);     
    const result = await LibTest.addItem(data);
//console.log(result);
    res.json({ret: 'OK, test4:', data : result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
module.exports = router;

