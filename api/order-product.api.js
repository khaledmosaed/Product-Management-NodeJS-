/**
 * Created by k_mosaed on 8/24/2017
 */
var express = require('express');
var router = express.Router();
var con = require('../dal/mysql.connection');  // Module for connection

var orderDal = require('../dal/order.dal');

var productDal = require('../dal/product.dal')


// Add New Record Query-------------------------------??


/**
 * add new product to existing order
 * 1- insert in to bridge table
 * 2- ubdate order price
 * @param prodID
 * @param ordID
 * @param res
 */

var addproduct = function (prodID,ordID, res) {
    
      var sql = "INSERT INTO `orderproduct` (`prodID`,`ordID`) " 
        + " VALUES ('" + prodID + "','" + ordID + "' )";
    
      console.log('addproduct');


      // get the product
    productDal.getByid(prodID)
    .then(function (prduct) {

      
        // get the order

        orderDal.getbyId(ordID)
            .then(function (order) {
                console.log('order found', order);


                ///
                order.totalPrice +=  prduct.price ;

                // ubdate order in database

                console.log('adding productss',order,prduct );

                orderDal.updateOrder(order.orderId, order.userId, order.totalPrice, order.status, res) ;


                // easy easy
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");

                });


            })
            .catch(function (e) {
                res.send("error orderDal.getByid")
            });


    })
    .catch(function (e) {
        res.send("error product.getByid")

    });






};
    
    
router.post ('/addOrdrPr', function (req, res) {
    
      var newUrecord = req.body;
      console.log(newUrecord);
    
      var prodID = newUrecord.prodID,
          ordID = newUrecord.ordID;
    
      addproduct (prodID,ordID, res);
});


module.exports = router;