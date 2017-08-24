var con = require('./mysql.connection');  // Module for connection

 var getByid = function(id) {
    
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


 var productDal= {
    getByid:getByid,
    insertProduct:insertProduct,
    deleteProduct:deleteProduct,
    updateProduct:updateProduct ,
    serchProduct:serchProduct
 }

  module.exports =productDal;