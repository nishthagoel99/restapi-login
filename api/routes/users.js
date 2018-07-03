var express=require('express');
var app=express();
var router=express.Router();
var con=require('../model/user');

router.get('/',function(req,res){
    con.query('SELECT Name,Password FROM login',function(err,result){
      if(err){
        res.status(404).json({message:'error '});
      }else{
        res.status(200).json({
          message:'get request for login',
          users:result
      });
    }
  });  
});


module.exports=router;