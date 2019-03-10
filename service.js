/*
  业务模块
*/
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js'); // 加载数据库模块

// 自动生成图书编号
let maxBookCode = () => {
  let arr = [];
  data.forEach(item => {
    arr.push(item.id);
  });
  return Math.max.apply(null, arr);
}

// 把内存数据写入文件 （抽取的公共方法）
let writeDataToFile = ( res ) => {
  // JSON.stringify(data, null , 空格数)
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
    if (err) {
      res.send('server error')
    }
    // 文件写入成功后跳转主页面 -》重定向
    res.redirect('/');
  })
}


// 渲染主页面
exports.showIndex = (req, res) => {
  // 通过读取数据库获取数据
  let sql = 'select * from book';
  db.base(sql,null,(result)=>{
    console.log(result);
    // 将返回函数 放在数据库回调中执行
    res.render('index', {
      list: result
    });
  });

  
}

// 跳转到添加图书页面
exports.toAddBook = (req, res) => {
  res.render('addBook', {});
}

// 添加图书 保存数据
exports.addBook = (req, res) => {
  // 获取表单数据
  let info = req.body;
  let book = {};

  for (let key in info) {
    book[key] = info[key];
  }

  let sql = 'insert into book set ?';
  db.base(sql,book,(result)=>{
    if(result.affectedRows == 1){
      res.redirect('/');
    }
  })
  // book.id = maxBookCode() + 1;
  // data.push(book);
  // // 把内存中的数据写入文件
  // writeDataToFile(res);
}

// 跳转到编辑图书页面
exports.toEditBook = (req, res) => {
  // 查询对应id 数据
  let id = req.query.id;
  
  let sql ='select * from book where id=?';
  let data = [id];
  db.base(sql , data , (result)=>{
    res.render('editBook', result[0]);
  });
  // let book = {};
  // data.forEach(item => {
  //   if (id == item.id) {
  //     book = item;
  //     return;
  //   }
  // })
  // res.render('editBook', book);
}

// 编辑图书更新数据
exports.editBook = (req, res) => {
  // 获取表单数据
  let info = req.body;
  let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
  let data = [info.name,info.author,info.category,info.description,info.id];
  db.base(sql,data,(result)=>{
    if(result.affectedRows == 1){
      res.redirect('/');
    }
  });
  // // 获取对应id 数据
  // data.forEach(item => {
  //   if (info.id == item.id) {
  //     for (let key in info) {
  //       item[key] = info[key];
  //     }
  //     return;
  //   }
  // })

  // // 把内存中的数据写入文件
  // // 把内存中的数据写入文件
  // writeDataToFile(res);
}

// 删除图书更新数据
exports.delBook = (req, res) => {
  // 获取id
  let id = req.query.id;
  let sql = 'delete from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
    if(result.affectedRows == 1){
      res.redirect('/');
    }
  });
  // // 删除对应id 数据
  // data.forEach( (item, index) => {
  //   if( id == item.id ){
  //     // 删除数组中的一项数据
  //     data.splice(index, 1);
  //   }
  //   return;
  // })

  // // 把内存中的数据写入文件
  // writeDataToFile(res);
}