/*
  路由模块
*/
const express = require('express');
const router = express.Router();
// 引入服务 处理
const service = require('./service.js');

// 路由处理
router.get('/', service.showIndex);
router.post('/getBooks', service.getBooks);
// 添加图书（跳转到添加图书页面）
router.get('/toAddBook', service.toAddBook);
// 添加图书（提交表单）
router.post('/addBook', service.addBook);
// 跳转到编辑图书信息页面、
router.get('/toEditBook', service.toEditBook);
// 编辑图书后提交
router.post('/editBook', service.editBook);
// 删除指定id图书  不理解为什么是 get 请求
router.get('/delBook', service.delBook);

// 导出路由模块
module.exports = router;