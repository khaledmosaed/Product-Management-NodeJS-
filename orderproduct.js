/**
 * Created by k_mosaed on 8/24/2017
 */
var express = require('express');
var router = express.Router();
var con = require('./mysql.connection');  // Module for connection


// Add New Record Query-------------------------------?? 

var addproduct = function (prodID,ordID, res) {
    
      var sql = "INSERT INTO `orderproduct` (`prodID`,`ordID`) " 
        + " VALUES ('" + prodID + "','" + ordID + "' )";
    
      console.log(sql);

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        var data = { insertId: result.insertId }
        res.send(data);
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