var express= require('express');
var bodyParser = require('body-parser')

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
  })
 
  app.post('/api/users', jsonParser, function (req, res) {
   
  })


app.post("/",function(req,res){
    console.dir(req.body);
    res.send(req.body.name);
})

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
