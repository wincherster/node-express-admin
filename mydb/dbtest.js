/**
 * 测试数据库操作通用api
 *  */

const db = require('./db.js');

// 插入操作
// let sql ='insert into book set ?';
// let data = {
//   name: '笑傲江湖',
//   author: '金庸',
//   category: '文学',
//   description: '武侠小说'
// }

// db.base(sql,data, (result) => {
//   console.log(result);
// });

// 更新操作

// let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
// // 对应的字段如果不修改，也要写上
// let data = ['天龙八部','金庸','文学','武侠小说',12];
// db.base(sql,data,(result)=>{
//   console.log(result);
// });

// 删除操作
// let sql = 'delete from book where id = ?';
// let data = [1];
// db.base(sql ,data,(result)=>{
//   console.log(result);
// });

// 查询操作
let sql = 'select * from book where id =?';
let data = [7];

db.base(sql,data,(result)=>{
  console.log(result[0].name);
})