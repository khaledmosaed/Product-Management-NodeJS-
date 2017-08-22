/**
* Created by k_mosaed on 8/21/2017
*/
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var mysql = require('mysql');  // Module for connection

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// connection code
var con = mysql.createConnection({
  host: "localhost",     //192.168.1.4
  user: "root",          // Server userName
  password: "",          // Server  Password
  database: "purchases"   // DataBase Name
});

//** Check Connection **//
con.connect(function (err) {
  if (err) throw err;
  console.log("Database connected  for Order Table Now...!");
});

// Insert Code Query-------------------------------?? 

var insertOrder = function (userId, totalPrice, status, res) {

  var sql = "INSERT INTO `orders`( `userId`, `totalPrice`,`createAt`,`status`) "
    + " VALUES ('" + userId + "' ,'" + totalPrice + "', NOW(),'" + status + "' )";

  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    var data = { insertId: result.insertId }
    res.send(data);
  });
};

app.post('/insrtOrd', function (req, res) {

  var newOrder = req.body;
  console.log(newOrder);

  var userId = newOrder.userId,
    totalPrice = newOrder.totalPrice,
    status = newOrder.status;

  insertOrder(userId, totalPrice, status, res);
});

// Delete Code Query-------------------------------??

var deleteOrder = function (orderId, res) {
  var sql = " DELETE FROM `orders` WHERE orderId ='" + orderId + "' ";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result);
    res.send(result);
  });
};

app.delete('/deltOrder', function (req, res) {
  //log data   
  console.log(req.body);
  var orderId = req.body.orderId;

  // delete record 
  deleteOrder(orderId, res);
});

//Update Code Query --------------------------------- 

var updateOrder = function (orderId, userId, totalPrice, status, res) {

  var sql = "UPDATE `orders` SET userId='" + userId + "' , totalPrice = '" + totalPrice + "' ,status ='" + status + "' "
    + " WHERE orderId = '" + orderId + "'";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result + " records updated");
    res.send(result);
  });
};

app.put('/updtOrder', function (req, res) {
  //log data

  var vare = req.body;
  console.log(vare);

  var orderId = vare.orderId,
    userId = vare.userId,
    price = vare.price,
    totalPrice = vare.totalPrice,
    createAt = vare.createAt,
    status = vare.status;
  // update record 
  updateOrder(orderId, userId, totalPrice, status, res);
});

// Search Code Query-------------------------------

var searchOrder = function (orderId, userId, totalPrice, status, res) {

  var sql = " SELECT * FROM `orders` WHERE "
    + " orderId LIKE '%" + orderId + "%' "
    + " AND userId LIKE '%" + userId + "%' "
    + " AND  totalPrice LIKE '%" + totalPrice + "%' "
    + " AND status LIKE '%" + status + "%' ";
  console.log(sql);
  // el concole log
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("searched Value " + result);
    res.send(result);
  });
};

app.get('/serchOrder', function (req, res) {
  //log data
  var seavlue = req.query;
  console.log('serchOrder',seavlue);

  var orderId = seavlue.orderId,
    userId = seavlue.userId,
    totalPrice = seavlue.totalPrice,
    status = seavlue.status;

  if (!orderId) { orderId = ""; }

  searchOrder(orderId, userId, totalPrice, status, res);
});

// Console output..
app.listen(3033, function () {
  console.log("Example Listen to your port:3033");
});