//注册ajax全局事件
//在ajaxStart()开启
$(document).ajaxStart(function () {
    NProgress.start();
})
//在ajaxStop()关闭
$(document).ajaxStart(function () {
    NProgress.done();
})