// 把data.json文件中的数据拼接成 insert语句

const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname, '../','data.json'), 'utf8',(err,content)=>{
  if(err) return;
  // 处理具体数据，获取的是字符串，要转成数组
  let list = JSON.parse(content);
  let arr = [];
  list.forEach( item => {
    let sql = `insert into book (name,author,category,description) values ('${item.name}','${item.author}','${item.category}','${item.desc}');`
    arr.push(sql);
  });

  fs.writeFile(path.join(__dirname,'data.sql'),arr.join(''),'utf8',(err)=>{
    console.log('init data finished!');
  });
});