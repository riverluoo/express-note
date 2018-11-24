var express= require('express');

var app = express();

app.get('/' , function(req,res){
    console.dir(req.query);
    res.send("params: " + req.query.find)
})

app.get('/profile/:id' ,function(req,res){
    console.dir(req.params)
    var resOnject = {
        name:req.params.id
    } 
    res.send(resOnject);
});

app.listen(7000);
console.log('监听7000端口')
