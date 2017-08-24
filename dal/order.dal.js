var con = require('./mysql.connection');  // Module for connection


 var getbyId = function(orderId) {
  
    //  create promise object 
    var promise =  new Promise(function (resolve, reject) {
      
  
      //  make query in database
      var sql = "SELECT * FROM `orders` WHERE  orderId = '" + orderId + "' ";
      con.query(sql, function (err, result) {
        
        if (err) {
          console.log('promis will finish next line with reject');    
          reject(err)
        }
  
        console.log("" , result);
  
        // resolve the promise
        console.log('promis will finish next line with resolve'); 
        var data = null ; 
        if (result.length > 0)        
          {
            data = result[0];
          }
  
        if(data){
           resolve(data);
        }else{
          reject({err:"user not found"});
        }
      });
    });
  
    console.log('return promise object');
    return promise ; 
};


// Insert Code Query------------------------------- ---

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

// Delete Code Query----------------------------------

var deleteOrder = function (orderId, res) {
  var sql = " DELETE FROM `orders` WHERE orderId ='" + orderId + "' ";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result);
    res.send(result);
  });
};

// Update Code Query --------------------------------- 

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

var orderDal ={
    getbyId:getbyId,
    insertOrder:insertOrder ,
    deleteOrder:deleteOrder,
    updateOrder:updateOrder,
    searchOrder:searchOrder
}

module.exports = orderDal;
