/*
  后台接口开发 

*/ 
const express = require('express');
const db = require('./db.js');
const app = express();

// 指定api 路径 allbooks （json 接口）
// app.get('/allBooks', (req,res)=>{
//   let sql = 'select * from book';
//   db.base(sql,null,(result)=>{
//     res.json(result);
//   });
// });

// 指定api 路径 allbooks （jsonp 接口）
// 自定义callback名称，修改后用callback名字会返回json 数据 并且不报错
app.set('jsonp callback name', 'cb'); 
app.get('/allBooks', (req,res)=>{
  let sql = 'select * from book';
  db.base(sql,null,(result)=>{
    res.jsonp(result);
  });
});

app.listen(3000, ()=>{
  console.log('running express')
});