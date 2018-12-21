$(function () {
    //获取地址栏数据方法
    function getreset(a) {
        var obj = {}
        var str = location.search
        str = decodeURI(str)
        str = str.slice(1)
        var arr = str.split('&')
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0]
            var val = arr[i].split("=")[1]
            obj[key] = val
        }
        return obj[a]
    }
    //一进入页面获取地址栏数据，发送请求渲染,并给搜索框赋值
    var value = getreset('reset')
    $('.search_ipt input').val(value)
    var obj = {
        proName: $('.search_ipt input').val(),
        page: 1,
        pageSize: 100,
    }
    rander(obj)
    function rander(obj) {

        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            dataType: 'json',
            data: obj,
            success: function (res) {

                var htmlstr = template('temp', res)
                $('.product').html(htmlstr)
            }
        })
    }

    // 点击搜索获取内容搜索
    $('.search_ipt button').on('click', function () {
        console.log($('.search_ipt input').val());
        var obj = {
            proName: $('.search_ipt input').val(),
            page: 1,
            pageSize: 100,
        }
        rander(obj)
    })
    //点击商品进入详情页
    $('.product').on('click', 'a', function () {
        //跳转到product.html
        var id = $(this).data('id')
        location.href = 'product.html?id=' + id
    })
    //点击排序会加上now的类
    $('.searchList a').on('click', function (e) {

        if ($(this).hasClass('now')) {
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
            // 获取他的自定义属性
            var shux = $(this).find('i').data('type')
            var zhi = $(this).find('i').hasClass('fa-angle-down') ? 2 : 1
            var obj = {
                proName: $('.search_ipt input').val(),
                page: 1,
                pageSize: 100,
            }
            obj[shux] = zhi
            console.log(obj);
            rander(obj)
        } else {
            $('.searchList a').removeClass('now')
            $(this).addClass('now')
        }
    })
})