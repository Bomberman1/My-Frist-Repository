//注册ajax全局事件
//在ajaxStart()开启
$(document).ajaxStart(function () {
    NProgress.start();
})
//在ajaxStop()关闭
$(document).ajaxStop(function() {
      // 当全部的ajax请求完成时, 关闭进度条
      NProgress.done();
  });

$(function(){
    //点击分类管理展示div
    var $fa = $('nav .fa')
    var $son = $('nav .fa .son')
    var $header_left = $('.header_left')
    console.log($son);
    $fa.on('click',function () {
        $son.slideToggle()
    })
    //显示隐藏侧边栏
    var index =1 
    $header_left.on("click",function(){
        index++
        if(index%2 == 0){
            $('nav').animate({
                left : -180+'px',
            },1000)
            $('header').animate({
                paddingLeft : 0+'px'
            },1000)
            $('.main').animate({
                paddingLeft : 0+'px'
            },1000)
        }else{
            $('nav').animate({
                left : 0+'px',
            },1000)
            $('header').animate({
                paddingLeft : 180+'px'
            },1000)
            $('.main').animate({
                paddingLeft : 195+'px'
            },1000)
        }
        
    })
    //点击显示模态框
    $('.header_right').on('click',function(){
        $('#myModal').modal('show')
        // 点击退出按钮发送ajax
        $('#out').on('click',function () {
            $.ajax({
                url : '/employee/employeeLogout',
                dataType : 'json',
                type : 'GET',
                success : function (res) {
                    if(res.success){
                        //返回至登录页
                        location.href = './login.html'
                    }
                }
            })
        })
    })
})