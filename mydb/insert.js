//  插入数据

// 加载数据库驱动
const mysql      = require('mysql');
// 创建数据库连接
const connection = mysql.createConnection({
  host     : 'localhost', // 数据库所在的服务器的域名或者IP地址
  user     : 'root', // 用户名称 登录数据库的账号
  password : '', // 登录数据库的密码
  database : 'book' // 数据库表的名称
});
// 执行连接操作
connection.connect();

// 插入数据操作
let sql = 'insert into book set ?';

let data = {
  name: '明朝那些事',
  author: '当年明月',
  category: '文学',
  description: '明朝的历史'
}
// 操作数据库 query( sql语句，数据， Fn)
connection.query(sql, data, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  // 结果信息
  // OkPacket {
  //   fieldCount: 0,
  //   affectedRows: 1, // 操作影响的行数，如果是 1 说明操作成功
  //   insertId: 11,
  //   serverStatus: 2,
  //   warningCount: 0,
  //   message: '',
  //   protocol41: true,
  //   changedRows: 0 }

  if(results.affectedRows == 1){
    console.log('新增成功');
  }
});

// 关闭数据库
connection.end();