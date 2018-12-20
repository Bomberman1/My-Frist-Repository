

//左边功能动态渲染
$(function () {
    $.ajax({
        url : '/category/queryTopCategory',
        dataType : 'json',
        type : 'get',
        success : function (res) {
            // console.log(res);
            var htmlstr = template('left_tmp',res)
            $('.category_left ul').html(htmlstr)
            $('.category_left li:nth-child(1) a').addClass('now')
            var id = $('.category_left li:nth-child(1) a').data('id')
            rander(id)
        }
    })
})


//点击左边的li让其高亮并且动态渲染右边
$('.category_left ul').on('click' , 'a' ,function () {
    $('.category_left ul a').removeClass('now')
    $(this).addClass('now')
    var id = $(this).data('id')
    rander(id)
})

function rander(id) {
    $.ajax({
        url : '/category/querySecondCategory',
        type : 'get',
        data : {
            id : id
        },
        dataType : 'json',
        success : function(info){
            var str = template('right_tmp',info)
            $('.category_right ul').html(str)
        }
    })
}