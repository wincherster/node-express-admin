//  更新数据

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

// 插入数据操作  需要条件 id 不然就是更新所有数据【限定条件一定要加】
let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
// 传数组
let data = ['浪潮之巅','吴军','计算机','IT巨头的兴衰史2',6];
// 操作数据库 query( sql语句，数据， Fn)
connection.query(sql, data, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  // 结果信息
  // OkPacket {
  //   fieldCount: 0,
  //   affectedRows: 1,
  //   insertId: 0,
  //   serverStatus: 2,
  //   warningCount: 0,
  //   message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  //   protocol41: true,
  //   changedRows: 1 }

  if(results.affectedRows == 1){
    console.log('更新成功');
  }
});

// 关闭数据库
connection.end();