var express=require('express');
var app=express();
var mysql=require('mysql');
var bcrypt=require('bcrypt');
var bodyParser=require('body-parser');
var router=express.Router();
var jwt=require('jsonwebtoken');
var con=require('../model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
            /*
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
                */
                bcrypt.compare(password,result[0].HashedPass,function(error,result1){
                    if(error){
                        res.status(404).json({message:'error in comparing'});
                    }else{
                        if(result1){
                        jwt.sign({
                            Name:result[0].Name,
                            Password:result[0].Password
                        },'secret',function(error,result2){
                            if(error) {
                                res.status(404).json({message:'error in jwt sign'});
                            }else{
                                res.status(200).json({message:'token generated',token:result2});
                            }
                        });
                    }else{
                        res.status(300).json(({message:'password doesnt match'}));
                    }
                    }
                });
            }else{
                res.status(409).json({message:'no user with that name'});
            }
        }
     });

});


module.exports=router;