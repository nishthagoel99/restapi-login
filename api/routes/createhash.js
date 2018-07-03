var express=require('express');
var app=express();
var bcrypt=require('bcrypt');
var router=express.Router();
var con=require('../model/user');

router.post('/',function(req,res){
    console.log('connec');
    name=req.body.name; 
     password=req.body.password;
     con.query('SELECT * FROM login WHERE Name=?',name,function(error,result){
        if(error){
            console.log('error');
            res.status(404).json({message:'error in finding name'});
        }else{
            if(result.length>0){
                bcrypt.hash(result[0].Password,10,function(error,hash){
                    if(error){
                        res.status(404).json({message:'error in hashing'});
                    }else{
                        console.log(hash);
                        con.query('UPDATE login SET HashedPass=? WHERE Name=?',[hash,name],function(error,updated){
                            if(error){
                                res.status(404).json({message:'error in updating'});
                            }else{
                                console.log('updated');
                            }
                        });
                    }
                });
            }
        }
    });
});


module.exports=router;