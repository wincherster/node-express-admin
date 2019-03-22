// 启动Express 服务器 
const express = require('express')
// 引入 path 路径模块
const path = require('path');
// 引入 自定义路由文件
const router = require('./router.js');
const bodyParser = require('body-parser');

// 使用模板引擎
const template = require('art-template');
const app = express()

// 启动静态资源服务
app.use('/www', express.static('public'));

// 1.设置模板的路径
app.set('views', path.join(__dirname, 'views'));
// 2.设置模板引擎
app.set('view engine', 'art');
// 3.使express兼容 art-template 模板引擎
app.engine('art', require('express-art-template'));

// 挂载参数处理中间件 （post 请求）
app.use(bodyParser.urlencoded({extended: false}));
// 处理json格式参数
app.use(bodyParser.json());

const url = require("url"); // 解析url为对象
const querystring = require('querystring'); // 解析如‘a=1&b=2’为对象

//3. 访问服务器(get或者post)
//参数一: 请求根路径
// app.get('/', function (req, res,next) {
//     // 1. 直接返回 对应路径的静态文件
//     // response.sendfile(`${__dirname}/index.html`);

//     // 2. 返回自定义数据
//     let data = {
//         title: "水果",
//         list: ['apple','orang','bannana']
//     }
//     // 参数一：模板名称，参数二：渲染模板的数据
//     res.render('list', data);
// })

// app.get('/get', function (req, res,next) {
//     res.sendfile(`${__dirname}/json/index.json`);
// })

// app.post('/post', function (req, res) {
// 	console.log(req.body);
// 	// 直接返回 请求体
//     res.send(req.body);
// })

// 配置路由
app.use(router);

var PORT = 3030;
var HOST = '127.0.0.1';
//3. 绑定端口
app.listen(PORT, HOST);
console.log(`浏览器打开 http://${HOST}:${PORT}`);