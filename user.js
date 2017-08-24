
/**
* Created by k_mosaed on 8/23/2017
*/
var express = require('express');
var router = express.Router();
var con = require('./mysql.connection');  // Module for connection


/**
 *  get user by userid 
 *  return promise  which will return one user object if exist or NULL if not exist
 *  or reject if error occured
 *  - - - - - - - -  - - - - -  - - - 
 * example:
          getById(5)
          .then(function(data){
            // sucess call back here  and use found
          })
          .catch(function(error){
            // error call back here and user not found 
          })

 */

function getById(userId) {
    
      //  create promise object 
      var promise =  new Promise(function (resolve, reject) {
        
    
        //  make query in database
        var sql = "SELECT * FROM `user` WHERE  userId = '" + userId + "' ";
        con.query(sql, function (err, result) {
          
          if (err) {
            console.log('promis will finish next line with reject');    
            reject(err)
          }
    
          console.log("" , result);
    
          // resolve the promise
          console.log('promis will finish next line with resolve'); 
          var data = null ; 
          if(result.length > 0)        
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

// Insert Code Query------------------------------- 
var insertUser = function (name, password, email, imag, mobile, res) {
    
      var sql = "INSERT INTO `user`(`name`, `password`,`email`,`imag`,`mobile`) "
        + " VALUES ('" + name + "' ,'" + password + "', '" + email + "','" + imag + "','" + mobile + "' )";
    
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        var data = { insertId: result.insertId }
        res.send(data);
      });
};


// Delete Code Query-------------------------------

var deletUser = function (userId, name, password, email, imag, mobile, res) {
    var sql = " DELETE FROM `user` WHERE userId ='" + userId + "' ";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result);
      res.send(result);
    });
};


// Update Code Query --------------------------------- 

var updateUser = function (userId, name, password, email, imag, mobile, res) {
    
      var sql = "UPDATE `user` SET name='" + name + "' , password = '" + password + "', email = '" + email + "' "
        + ",imag = '" + imag + "',mobile = '" + mobile + "'  WHERE userId = '" + userId + "'";
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result + " records updated");
        res.send(result);
      });
};


// Search Code Query-------------------------------

var searchUser = function (userId, name, password, email, imag, mobile, res) {
    
      var sql = " SELECT * FROM `user` WHERE "
        + " userId LIKE '%" + userId + "%' "
        + " AND name LIKE '%" + name + "%' "
        + " AND password LIKE '%" + password + "%' "
        + " AND email LIKE '%" + email + "%' "
        + " AND imag LIKE '%" + imag + "%' "
        + " AND mobile LIKE '%" + mobile + "%' ";
      console.log(sql);
      // el concole log
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("searched Value " + result);
        res.send(result);
      });
};
    
    

/*
 * GET userlist.
 */


router.post('/instUser', function (req, res) {
    
      var newUser = req.body;
      console.log(newUser);
    
      var name = newUser.name,
          password = newUser.password,
          email = newUser.email,
          imag = newUser.imag,
          mobile = newUser.mobile;
    
      insertUser(name, password, email, imag, mobile, res);
});
    
router.delete('/deltUser', function (req, res) {
    //log data   
    console.log(req.body);
    var delUser = req.body;
    var userId = delUser.userId;
    name = delUser.name,
    password = delUser.password,
    email = delUser.email,
    imag = delUser.imag,
    mobile = delUser.mobile;

    // delete record 
    deletUser(userId, name, password, email, imag, mobile, res);
});

router.put('/updtUser', function (req, res) {
    //log data

    var vare = req.body;
    console.log(vare);

    var userId = vare.userId;
    name = vare.name,
    password = vare.password,
    email = vare.email,
    imag = vare.imag,
    mobile = vare.mobile;
    // update record 
    updateUser(userId, name, password, email, imag, mobile, res);
});

router.get('/serchUser', function (req, res) {
    //log data
    var seavlue = req.query;
    console.log(seavlue);

    var userId = seavlue.userId;
    name = seavlue.name,
    password = seavlue.password,
    email = seavlue.email,
    imag = seavlue.imag,
    mobile = seavlue.mobile;

    if (!userId) { userId = ""; }

    searchUser(userId, name, password, email, imag, mobile, res);
});

router.get('/userbyid', function (req, res) {

    var id = req.query.id ; 

    getById(id).then(function(data){
    console.log('userbyid data',data);
    res.send(data) ; 
    })
    .catch(function(error){
    console.log('userbyid errr',error);
    res.status(500).send(error) ; 
    })
    
});
    


module.exports = router;