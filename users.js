/**
* Created by k_mosaed on 8/22/2017
*/
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();   // for parsing multipart/form-data
var mysql = require('mysql');  // Module for connection

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// connection code
var con = mysql.createConnection({
  host: "localhost",     //192.168.1.4
  user: "root",          // Server userName
  password: "",          // Server  Password
  database:"purchases"   // DataBase Name
  });

   //** Check Connection **//
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

 // Insert Code Query-------------------------------?? 

var insertUser = function (userId, name, password ,email,imag,mobile,res){

    var sql = "INSERT INTO `user`(`userId`, `name`, `password`,`email`,`imag`,`mobile`) "
     +" VALUES ('"+userId+"','"+name+"' ,'"+password+"', '"+email+"','"+imag+"','"+mobile+"' )";

   console.log(sql);
   con.query( sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    var data = {insertId:result.insertId}
    res.send(data);
  }); 
};

  app.post('/instUser', function (req, res) {

    var newUser = req.body;
    console.log(newUser);

    var userId = newUser.userId, 
        name = newUser.name,
        password = newUser.password ,  
        email = newUser.email,
        imag = newUser.imag,
        mobile = newUser.mobile;
  
        insertUser(userId, name, password ,email,imag,mobile,res);
  });

// Delete Code Query-------------------------------??

var deletUser = function ( userId, name, password ,email,imag,mobile,res){
    var sql = " DELETE FROM `user` WHERE userId ='"+userId+"' ";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result);
      res.send(result);
    });
  };

app.delete('/deltUser', function (req, res) {
        //log data   
        console.log(req.body);
        var delUser =req.body;
        var userId =delUser.userId ;
             name =delUser.name,
             password=delUser.password ,
             email=delUser.email,
             imag=delUser.imag,
             mobile=delUser.mobile;

        // delete record 
        deletUser(userId, name, password ,email,imag,mobile,res);
    });

//Update Code Query --------------------------------- 

var updateUser = function (userId, name, password ,email,imag,mobile,res) {
    
  var sql = "UPDATE `user` SET name='"+name+"' , password = '"+password+"', email = '"+email+"' "
    +",imag = '"+imag+"',mobile = '"+mobile+"'  WHERE userId = '"+userId+"'";
      console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result + " records updated");
          res.send(result);
        });
      };

      app.put('/updtUser', function (req, res) {
        //log data

        var vare=req.body;
        console.log(vare);
      
        var userId =vare.userId ;
            name =vare.name,
            password=vare.password ,
            email=vare.email,
            imag=vare.imag,
            mobile=vare.mobile;
        // update record 
        updateUser(userId, name, password ,email,imag,mobile,res);
    });

// Search Code Query-------------------------------

var searchUser = function ( userId, name, password ,email,imag,mobile,res) {
    
            var sql = " SELECT * FROM `user` WHERE "
                        +" userId LIKE '%"+userId+"%' "
                        +" AND name LIKE '%"+name+"%' "
                        +" AND password LIKE '%"+password+"%' "
                        +" AND email LIKE '%"+email+"%' "
                        +" AND imag LIKE '%"+imag+"%' "
                        +" AND mobile LIKE '%"+mobile+"%' ";
            console.log (sql);
             // el concole log
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("searched Value " + result);
            res.send(result);
            });  
         };
    
         app.get('/serchUser', function (req, res) {
            //log data
            var seavlue=req.query;
            console.log(seavlue);
    
            var userId =seavlue.userId ;
                name =seavlue.name,
                password=seavlue.password ,
                email=seavlue.email,
                imag=seavlue.imag,
                mobile=seavlue.mobile;
        
            if (!userId) {userId = ""; }
            
            searchUser(userId, name, password ,email,imag,mobile,res);
         });

  // Console output..
  app.listen(3033 ,function(){
       console.log("Example Listen to your port:3033");
  });