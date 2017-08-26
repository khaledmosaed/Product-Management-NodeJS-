/**
 * Created by k_mosaed on 8/24/2017
 */
var express = require('express');
var router = express.Router();
var con = require('../dal/mysql.connection');  // Module for connection

var orderDal = require('../dal/order.dal');

var productDal = require('../dal/product.dal')

// Add New Record Query-------------------------------


/**
 *
 * add new product to existing order
 * 1- insert in to birdge table
 * 2- ubdate order price
 * @param prodID
 * @param ordID
 * @param res
 * */

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

                console.log('adding products',order,prduct );

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

/** deleteorder*/

var deletproduct = function (prodID,ordID, res) {

     var sql = "DELETE FROM `orderproduct` WHERE prodID ='"+ prodID +"' AND ordID ='"+ ordID +"' ";
      console.log('deletproduct');


      // get the product
    productDal.getByid(prodID)
    .then(function (prduct) {


        // get the order

        orderDal.getbyId(ordID)
            .then(function (order) {
                console.log('order found', order);


                ///
                order.totalPrice = (order.totalPrice) - (prduct.price) ;

                // delete order in database

                console.log('Deleting products',order,prduct );

                orderDal.updateOrder(order.orderId, order.userId, order.totalPrice, order.status, res) ;

                // easy easy
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record deleted");

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


/** Select order products */
var  getproduct = function ( orderId , id, prodID , res) {

    var sql= "SELECT products.id "
           +"  FROM `products` , `orderproduct` ,`orders` WHERE  "
           +" orders.orderId = '"+orderId+"'  AND  "
           +"  products.id = orderproduct.prodID ";


    // get the product
     productDal.getByid(prodID)
        .then(function (prduct) {

            // get the order

            orderDal.getbyId(ordID)
                .then(function (order) {

                    ///
                   // order.totalPrice +=  prduct.price ;

                    // ubdate order in database

                    //console.log('adding products',order,prduct );

                    res.orderDal.send(orderId ,userId, totalPrice, status, res) ;


                    // easy easy
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record selected");

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




/**  add order products **/
router.post ('/addOrdrPr', function (req, res) {
    
      var newUrecord = req.body;
      console.log(newUrecord);
    
      var prodID = newUrecord.prodID,
          ordID = newUrecord.ordID;
    
      addproduct (prodID,ordID, res);

});

/**  delete order products **/
router.delete ('/deleOrdrPr', function (req, res) {

      var newUrecord = req.body;
      console.log(newUrecord);

      var prodID = newUrecord.prodID,
          ordID = newUrecord.ordID;

    deletproduct (prodID,ordID, res);
});

/**  get order producrts **/
router.get ('/getOrdrPr', function (req, res) {

    var newUrecord = req.body;
    console.log(newUrecord);

    var prodID = newUrecord.prodID,
        ordID = newUrecord.ordID;

    getproduct (prodID,ordID, res);

});





module.exports = router;