$(function(){

  // 渲染列表数据
  function initList(){
    $.ajax({
      type: 'get',
      url: '/books',
      dataType: 'json',
      success: function(data){
        // 渲染数据列表
        var html = template('indexTpl',{list: data});
        $('#dataList').html(html);
        // 必须在渲染完成内容之后才可以操作DOM标签
        $('#dataList').find('tr').each(function(index,element){
          var td = $(element).find('td:eq(5)');
          var id = $(element).find('td:eq(0)').text();
          td.find('a:eq(0)').click(function(){
            console.log(1);
            editBook(id);
          })
          td.find('a:eq(1)').click(function(){
            console.log(2);
            deleteBook(id);
          })

          // 绑定添加图书信息单击事件
          addBook();
          // 重置表单
          var form = $('#addBookForm');
          form.get(0).reset();
          // form.find('input[name=id]').val('');
          form.find('input[type=hidden]').val('');
        })
      }
    });
  }
  initList();
  // 删除图书信息
  function deleteBook(id){
    $.ajax({
      type: 'delete',
      url: '/books/book/' + id,
      dataType: 'json',
      success: function(data){
        // 删除成功后，重新渲染数据列表
        if(data.flag == '1'){
          initList();
        }
      }
    })
  }
  // 编辑图书信息
  function editBook(id){
    console.log(id);
    var form = $('#addBookForm');
    // 查询对应id的图书信息
    $.ajax({
      type: 'get',
      url: '/books/book/'+ id,
      dataType: 'json',
      success: function(data){
        console.log(data);
        // 弹框
        var mark = new MarkBox(600,400,'编辑图书',form.get(0));
        mark.init();
        // 填充表单数据
        form.find('input[name=id]').val(data.id);
        form.find('input[name=name]').val(data.name);
        form.find('input[name=author]').val(data.author);
        form.find('input[name=category]').val(data.category);
        form.find('input[name=description]').val(data.description);

        // 对提交按钮重新绑定事件
        // 先移除事件 再绑定新事件
        form.find('input[type=button]').unbind('click').click(function(){
          console.log(form.serialize());
          $.ajax({
            type: 'put',
            url: '/books/book',
            data: form.serialize(),
            dataType: 'json',
            success: function(data){
              console.log(data);
              if(data.flag == '1'){
                // 隐藏弹框
                mark.close();
                // 重新渲染数据列表
                initList();
              }
            }
          })
        })
      }
    })
  }
  // 添加图书信息 
  function addBook(){
    $('#addBookId').click(function(){
      var form = $('#addBookForm');
      // 实例化弹窗对象
      var mark = new MarkBox(600,400,'添加图书',form.get(0));
      mark.init();
  
      // 添加提交事件
      form.find('input[type=button]').unbind('click').click(function(){
        $.ajax({
          type: 'post',
          url: '/books/book',
          data: form.serialize(),
          dataType: 'json',
          success: function(data){
            if(data.flag == '1'){
              // 关闭弹窗
              mark.close();
              // 添加成功 重新渲染列表
              initList();
            }
          }
        })
      })
    });
  }
});