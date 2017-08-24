/*   This file contains connection code 
**/
var mysql = require('mysql');  // Module for connection

var con = mysql.createConnection({
    host: "localhost",      // 192.168.1.4
    user: "root",           // Server userName
    password: "",           // Server  Password
    database: "purchases"   // DataBase Name
  });
  
  //** Check Connection **//
  con.connect(function (err) {
    if (err) throw err;
    console.log("Database connected Now...!");
  });

  module.exports = con ; 