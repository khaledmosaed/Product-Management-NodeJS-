
/**
* Created by k_mosaed on 8/23/2017
*/
var express = require('express');
var router = express.Router();
var userDal = require('./dal/user.dal')
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
    
          userDal.insertUser(name, password, email, imag, mobile, res);
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
    userDal.deletUser(userId, name, password, email, imag, mobile, res);
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
    userDal.updateUser(userId, name, password, email, imag, mobile, res);
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

    userDal.searchUser(userId, name, password, email, imag, mobile, res);
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