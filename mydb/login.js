// 登录验证 （前端+后端+数据库）

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();


// 挂载参数处理中间件 （post 请求）
app.use(bodyParser.urlencoded({extended: false}));
// 启动静态资源服务
app.use(express.static('public'));

// 
app.post('/check',(req,res)=>{
  let param = req.body;
console.log(param);
  let sql = 'select count(*) as total from user where username=? and password=?';
  let data = [param.username,param.password];

  db.base(sql,data,(result)=>{
    // 结果是数组
    if(result[0].total == 1){
      res.send('login success!');
    }else {
      res.send('login failure!');
    }
  });
});

app.listen(3000,()=>{
  console.log('runing...');
});