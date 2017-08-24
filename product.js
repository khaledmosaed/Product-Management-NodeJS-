/**
 * Created by k_mosaed on 8/16/2017
 */
var express = require('express');
var router = express.Router();
var con = require('./mysql.connection');  // Module for connection


function getById(id) {
    
      //  create promise object 
      var promise =  new Promise(function (resolve, reject) {
        
    
        //  make query in database
        var sql = "SELECT * FROM `products` WHERE  id = '" + id + "' ";
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
  

// Insert Code Query-------------------------------

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

// Delete Code Query-------------------------------

var deleteProduct = function (id , res){
    var sql = "DELETE FROM products WHERE id = '"+id+"' ";
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result);
      res.send(result);
    });

};

// Update Code Query--------------------------------

var updateProduct = function (id ,name , price, img , sku , description , notes,res) {
    var sql = "UPDATE products SET name = '"+name+"' , price ='"+price+"', img = '"+img+"' "
    +", sku = '"+sku+"', description = '"+description+"' , notes ='"+notes+"'  WHERE id = '"+id+"'";
    
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result + " records updated");
          res.send(result);
        });
};

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


/*
 * GET userlist.
 */

router.post('/insrtProd', function (req, res) {
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

router.delete('/deltProd', function (req, res) {
  //log data
  console.log(req.body);
  var id =req.body.id ;
  // delete record 
  deleteProduct(id,res);
});

router.put('/updtProd', function (req, res) {
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

router.get('/serchProd', function (req, res) {
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

router.get('/productbyid', function (req, res) {
    
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


