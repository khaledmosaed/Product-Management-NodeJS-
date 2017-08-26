const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();   // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing roulication/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// enable origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// my modules
var userRouter = require('./api/user.api');
var productRouter = require('./api/product.api');
var orderRouter = require('./api/orders.api');
var orderProductRouter = require('./api/order-product.api');


app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);
app.use('/', orderProductRouter);
  
// Console output..
app.listen(3033, function () {
    console.log("Example Listen to your port:3033");
  });