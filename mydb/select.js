//  查询数据

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
let sql = 'select * from book where id=?';
// 传数组
let data = [6];
// 操作数据库 query( sql语句，数据， Fn)
connection.query(sql, data, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  console.log(results[0].name);
  // 结果返回的是一个数组，即使1条数据也要添加索引获取 数据中的某个属性

  // 结果信息
  // [ RowDataPacket {
  //   id: 6,
  //   name: '浪潮之巅',
  //   author: '吴军',
  //   category: '计算机',
  //   description: 'IT巨头的兴衰史2' } ]

  if(results.affectedRows == 1){
    console.log('查询成功');
  }
});

// 关闭数据库
connection.end();