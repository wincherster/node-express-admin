/*
  业务模块
*/
const data = require('./data.json');

const path = require('path');
const fs = require('fs');

// 自动生成图书编号
let maxBookCode = ()=>{
  let arr = [];
  data.forEach( item => {
    arr.push(item.id);
  });
  return Math.max.apply(null, arr);
}
// 渲染主页面
exports.showIndex = (req,res) => {
  res.render('index', {list : data});
}

// 跳转到添加图书页面
exports.toAddBook = (req,res) => {
  res.render('addBook', {});
}

// 添加图书 保存数据
exports.addBook = (req,res) => {
  // 获取表单数据
  let info = req.body;
  let book = {};

  for(let key in info){
    book[key] = info[key];
  }
  book.id = maxBookCode() + 1;

  data.push(book);
  // 把内存中的数据写入文件
// JSON.stringify(data, null , 空格数)
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data,null,4), (err)=>{
    if(err){ res.send('server error')}
    // 文件写入成功后跳转主页面 -》重定向
    res.redirect('/');
  })
}