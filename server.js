var express = require("express");
var fs = require('fs')
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (error) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

app.post('/upload', upload.single('logo'), function (req, res) {
    console.dir(req.file);
    res.send({
        'ret_code': 0
    })
});

app.get('/form', function (req, res) {
    var form = fs.readFileSync('./form.html', {
        encoding: "utf8"
    });
    res.send(form);
});

app.post("/login", urlencodedParser, function (req, res) {
    res.send("welcome, " + req.body.username);
});

app.post("/api/users", jsonParser, function (req, res) {});

app.post("/", function (req, res) {
    console.dir(req.body);
    res.send(req.body.name);
});

app.get("/", function (req, res) {
    console.dir(req.query);
    res.send("params: " + req.query.find);
});

app.get("/profile/:id", function (req, res) {
    console.dir(req.params);
    var resOnject = {
        name: req.params.id
    };
    res.send(resOnject);
});

app.listen(7000);
console.log("监听7000端口");