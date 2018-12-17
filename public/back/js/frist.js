
$(function () {
    var currentPage = 1
    var pageSize = 5
    rander()
    function rander() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var htmlstr = template('template', res)
                $('#template-box').html(htmlstr)
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(res.total / res.size),
                    size: "small",
                    onPageClicked: function (a, b, c, page) {
                        // console.log(page);
                        currentPage = page
                        rander()
                    }
                })
            }
        })
    }
// 点击添加分类按钮显示模态框
$("#addfenlei").on('click',function(){
    $("#addModal").modal('show')
    //设置表单校验规则
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields :{
            categoryName :{
                validators :{
                    notEmpty : {
                        message : '分类名不能为空'
                    }
                }
            }
        }
    })
    // 点击添加按钮发送ajax阻止默认行为
    $("#tianjia").on('click',function(e){
        e.preventDefault()
        $.ajax({
            url : '/category/addTopCategory',
            data : $('#form').serialize(),
            type : 'post',
            dataType : 'json',
            success : function(res){
                if(res.success){
                   $("#addModal").modal('hide')
                    currentPage = 1
                    rander()
                    // 重置表单状态
                    var validator = $("#form").data('bootstrapValidator')
                    validator.resetForm(true)
                }
            }
        })
    })
})
})