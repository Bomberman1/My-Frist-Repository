$(function () {

    var id = getsearch('id')
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            // 渲染
            var str = template('temp', res)
            $('#zhuti').html(str)
            //初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })


    function getsearch(a) {
        var obj = {}
        var str = location.search;
        str = decodeURI(str)
        str = str.substr(1)
        var arr = str.split('=')
        obj[arr[0]] = arr[1]
        return obj[a]
    }
})