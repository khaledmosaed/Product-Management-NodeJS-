
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


var getById = function (userId) {
    
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
  
/* Objext JSON to use it */
var userDal = {
    searchUser:searchUser ,
    updateUser:updateUser ,
    deletUser:deletUser ,
    insertUser:insertUser ,
    getById:getById

} ;


module.exports = userDal;
