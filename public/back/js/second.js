
$(function () {
    var currentpage = 1
    var pageSize = 5
    rander()
    function rander() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: "get",
            data: {
                page: currentpage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var htmlstr = template('template', res)
                $('#tbody').html(htmlstr)
                //分页功能
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentpage,
                    totalPages: Math.ceil(res.total / res.size),
                    size: 'small',
                    onPageClicked: function (a, b, c, page) {
                        currentpage = page
                        rander()
                    }
                })
            }
        })
    }
    //点击添加分类显示模态框
    $('#addfenlei').on('click',function () {
        $('#secondModal').modal('show')
    })
    //发送ajax动态渲染下拉框
    $.ajax({
        url : '/category/queryTopCategoryPaging',
        data : {
            page : 1,
            pageSize : 1000
        },
        dataType : 'json',
        type : 'get',
        success :function (info) {
            var str = template('template1',info)
            $('#selectorul').html(str)
            $('#selectorul').on("click",'li',function () {
                $('#dropdownMenu1 span:nth-child(1)').text($(this).children().text())
            })
        }
    })
    // 图片预览功能
    $("#fileimg").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var imgstr = data.result.picAddr;
          
          $('#yulanimg').attr('src',imgstr)


        }
  });
  //表单校验功能
})