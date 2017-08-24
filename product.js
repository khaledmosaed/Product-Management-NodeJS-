/**
 * Created by k_mosaed on 8/16/2017
 */
var express = require('express');
var router = express.Router();
var productDal = require('./dal/product.dal')
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
  productDal.insertProduct(name , price, img , sku , description , notes,res)
});

router.delete('/deltProd', function (req, res) {
  //log data
  console.log(req.body);
  var id =req.body.id ;
  // delete record 
  productDal.deleteProduct(id,res);
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
  productDal.updateProduct(id , name , price, img , sku , description , notes,res);
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
  
  productDal.serchProduct(id ,name , img , sku ,price , description , notes,res);
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


