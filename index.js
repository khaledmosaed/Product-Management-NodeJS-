const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();   // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing roulication/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// my modules
var userRouter = require('./user');
var productRouter = require('./product');
var orderRouter = require('./orders');
var orderProductRouter = require('./order-product');


app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);
app.use('/', orderProductRouter);
  
// Console output..
app.listen(3033, function () {
    console.log("Example Listen to your port:3033");
  });