/**
* Created by k_mosaed on 8/21/2017
*/
var express = require('express');
var router = express.Router();
var orderDal = require('../dal/order.dal');


router.post('/insrtOrd', function (req, res) {
  // get data form http request
  var newOrder  = req.body ; 
  //log data
  console.log(newOrder);

  // assgin data to local variables
  var userId =newOrder.userId , 
      totalPrice=newOrder.totalPrice,
      status=newOrder.status  ;
  // insert record 
  orderDal.insertOrder(userId, totalPrice, status, res)
});

router.delete('/deltOrder', function (req, res) {
  //log data   
  console.log(req.body);
  var orderId = req.body.orderId;

  // delete record 
  orderDal.deleteOrder(orderId, res);
});


router.put('/updtOrder', function (req, res) {
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
  orderDal.updateOrder(orderId, userId, totalPrice, status, res);
});


router.get('/serchOrder', function (req, res) {
  //log data
  var seavlue = req.query;
  console.log('serchOrder',seavlue);

  var orderId = seavlue.orderId,
    userId = seavlue.userId,
    totalPrice = seavlue.totalPrice,
    status = seavlue.status;

  if (!orderId) { orderId = ""; }

  orderDal.searchOrder(orderId, userId, totalPrice, status, res);
});

router.get('/ordersbyid', function (req, res) {
  
    var orderId = req.query.orderId ;

    orderDal.getbyId(orderId).then(function(data){
      console.log('userbyid data',data);
      res.send(data) ; 
    })
    .catch(function(error){
      console.log('userbyid errr',error);
      res.status(500).send(error) ; 
    })
   
});


module.exports = router;
