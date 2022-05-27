const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

const app = express();
app.use(cors())
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/todos',todosRouter);

//module.exports = app;
module.exports.handler = serverless(app);