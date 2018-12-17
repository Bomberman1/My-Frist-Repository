
$(function () {
    var currentPage = 1
    var pageSize = 5
    rander()
    function rander() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            type: 'GET',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('template', res)
                $('#tbody').html(htmlStr)
                //分页功能
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3 ,
                    currentPage : currentPage,
                    totalPages : Math.ceil(res.total/res.size),
                    size : 'small',
                    onPageClicked : function (a,b,c,page) {
                        currentPage = page
                        rander()
                    }
                })
            }
        })
    }
    //注册事件委托
    $('.table').on('click','tbody .btn',function () {
        // console.log($(this).parents('tr').data('id'))
        var id = $(this).parents('tr').data('id')
        console.log($(this).text())
        var isDelete = $(this).text()== '禁用' ? 0 : 1
        $.ajax({
            url : '/user/updateUser',
            type : 'post',
            data : {
                id : id,
                isDelete : isDelete
            },
            dataType : 'json',
            success : function (res) {
                console.log(res);
                if(res.success){
                    rander()
                }
            }
        })
    })
})