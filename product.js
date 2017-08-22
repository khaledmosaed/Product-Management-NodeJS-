/**
 * Created by k_mosaed on 8/16/2017
 */
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var mysql = require('mysql');  // Module for connection

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//* connection code 
var con = mysql.createConnection({
  host: "localhost",     //192.168.1.4
  user: "root",          // Server userName
  password: "",          // Server  Password
  database:"purchases"   // DataBase Name
});

 //** Check Connection **//
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected  for PRODUCT Table Now...!");
});

// Insert Code Query-------------------------------??

var insertProduct = function(name , price, img , sku , description , notes, res){
    
    var sql = ("INSERT INTO products ( name , price, img , sku , description , notes) "
               +"VALUES ('"+name+"',"+ price+",'"+ img+"','"+ sku+"', '"+ description+"', '"+ notes+"') ");

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      var data = {insertId:result.insertId}
      res.send(data);
    });
};

app.post('/insrtProd', function (req, res) {
    // get data form http request
    var newProduct  = req.body ; 
    //log data
    console.log(newProduct);

    // assgin data to local variables
    var name =newProduct.name , 
        price=newProduct.price,
        img=newProduct.img  ,
        sku =newProduct.sku ,
        description =newProduct.description ,
        notes=newProduct.notes  ;
    // insert record 
    insertProduct(name , price, img , sku , description , notes,res)
});

// Delete Code Query-------------------------------??

var deleteProduct = function (id , res){
    var sql = "DELETE FROM products WHERE id = '"+id+"' ";
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result);
      res.send(result);
    });

};
app.delete('/deltProd', function (req, res) {
        //log data
        console.log(req.body);
        var id =req.body.id ;
        // delete record 
        deleteProduct(id,res);
    });

//Update Code Query --------------------------------- 

var updateProduct = function (id ,name , price, img , sku , description , notes,res) {
    var sql = "UPDATE products SET name = '"+name+"' , price ='"+price+"', img = '"+img+"' "
    +", sku = '"+sku+"', description = '"+description+"' , notes ='"+notes+"'  WHERE id = '"+id+"'";
    
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result + " records updated");
          res.send(result);
        });
      };

      app.put('/updtProd', function (req, res) {
        //log data

        var vare=req.body;
        console.log(vare);

        var  id =vare.id ,
             name =vare.name , 
             price=vare.price,
             img=vare.img  ,
             sku =vare.sku ,
             description =vare.description ,
             notes=vare.notes  ;
        // update record 
        updateProduct(id , name , price, img , sku , description , notes,res);
    });


// Search Code Query-------------------------------

   var serchProduct = function (id ,name , img , sku ,price , description , notes,res) {

           var  sql= "SELECT * FROM products WHERE id LIKE '%"+id+"%' "
                    +" AND name LIKE '%"+name+"%' "
                    +" AND price LIKE '%"+price+"%' "
                    +" AND img LIKE '%"+img+"%' "
                    +" AND sku LIKE '%"+sku+"%' "
                    +" AND notes LIKE '%"+notes+"%' "
                    +" AND description like '%"+description+"%' " ;
  

        console.log (sql);
         // el concole log
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("searched Value " + result);
        res.send(result);
        });  
     };

     app.get('/serchProd', function (req, res) {
        //log data
        var seavlue=req.query;
        console.log(seavlue);

        var   id  =seavlue.id,
              name =seavlue.name , 
              price =seavlue.price,
              img=seavlue.img  ,
              sku =seavlue.sku ,
              description =seavlue.description ,
              notes=seavlue.notes  ;
    
        if (!id) { id = "" ;}
        
        serchProduct(id ,name , img , sku ,price , description , notes,res);
     });

 // Console output..
app.listen(3033, function () {
    console.log('Example app listening on port 3033!')
});
