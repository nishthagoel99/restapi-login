var mysql=require('mysql');

var con=mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'scrapdata'
});

con.connect(function(err){
    if(err){
        console.log('err');
    }else{
        console.log('connected');
    }
});
module.exports=con;