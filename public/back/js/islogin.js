//发送ajax判断用户有没有登录
$.ajax({
    url : '/employee/checkRootLogin',
    type : 'get',
    dataType : 'json',
    success : function (res) {
        if(res.error){
            location.href = 'login.html'
        }
    }
})