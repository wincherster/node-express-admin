/*
  路由模块
*/
const express = require('express');
const router = express.Router();
// 引入服务 处理
const service = require('./service.js');

// 路由处理
router.get('/', service.showIndex);
// 添加图书（跳转到添加图书页面）
router.get('/toAddBook', service.toAddBook);
// 添加图书（提交表单）
router.post('/addBook', service.addBook);

// 导出路由模块
module.exports = router;