var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
// 模版引擎
app.set('view engine', 'ejs')

app.get('/form2/:name', function (req, res) {
  var person = { age: 29, job: 'TT', hobbies: ['eating', 'coding', 'finshing']}
  res.render('form', { person: person })
})

// 路由
var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')

app.use('/', indexRouter)
app.use('/user', userRouter)



// 中间件函数
app.use(express.static("public"));

// 没有路径的中间件函数, 每次收到请求时执行该函数。
app.get("/first", function (req, res, next) {
  console.log("first middleware");
  next();
  // 没有响应请求，需要将控制权传递给下一个中间件函数
  console.log("first middleware after next");
});

// 安装在某个路径的中间件函数
app.use("/second", function (req, res, next) {
  console.log("second middleware");
  res.send("ok");
});

// app.use(function(req, res, next) {
//   console.log(404);
//   var err = new Error("Not Found");
//   err.status = 404;
// });

// 上传文件
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (error) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";
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

app.post("/upload", upload.single("logo"), function (req, res) {
  console.dir(req.file);
  res.send({
    ret_code: 0
  });
});

// 访问静态页面
app.get("/form", function (req, res) {
  var form = fs.readFileSync("./form.html", {
    encoding: "utf8"
  });
  res.send(form);
});

// post请求
app.post("/login", urlencodedParser, function (req, res) {
  res.send("welcome, " + req.body.username);
});

app.post("/api/users", jsonParser, function (req, res) {});

app.post("/", function (req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

// get请求
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