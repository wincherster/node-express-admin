/*
*  restful api 是从URL的格式来表述的
 *  get     http://localhost:3000/books
 *  get     http://localhost:3000/books/book
 *  post    http://localhost:3000/books/book
 *  get     http://localhost:3000/books/book/1
 *  put     http://localhost:3000/books/book
 *  delete  http://localhost:3000/books/book/2
 *
 */

 const express = require('express');
 const service = require('./service.js');
 const router = express.Router();
//  提供所有的图书信息
router.get('/books', service.allBooks);
// 添加图书信息时提交
router.post('/books/book', service.addBook)
//  编辑图书时根据id查询相应信息
router.get('/books/book/:id', service.getBookById);
// 提交编辑的数据
router.put('/books/book',service.editBook);
// 删除图书信息
router.delete('/books/book/:id', service.deleteBook);

// 必须到处 router 模块
module.exports = router;