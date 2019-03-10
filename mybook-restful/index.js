/* 
  实现图书管理系统后台接口

*/

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();

// 挂载参数处理中间件 （post 请求）
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

app.listen(3000,()=>{
  console.log('running 3000');
})
