// 假数据
// var arr = ['haha','hehe','aa','js']
// var jsonStr = JSON.stringify(arr)
// localStorage.setItem('search_List',jsonStr)


$(function () {
    //获取localstory数据
    function gethistory() {
        var jsonstr = localStorage.getItem('search_List')
        var arr = JSON.parse(jsonstr);
        return arr
    }
    //一进入页面渲染
    rander()
    function rander() {
        var arr = gethistory() || []
        var obj = {
            arr: arr
        };
        var str = template('temp', obj)
        $(".history").html(str)
    }
    //点击×删除指定的历史数据
    $('.history').on('click', '.hbottom i', function () {
        mui.confirm('你确定要删除该条记录吗', '温馨提示', function (e) {
            console.log(e);
            if (e.index === 1) {
                var index = $(this).data('index')
                var arr = gethistory()
                arr.splice(index, 1)
                var jsonstr = JSON.stringify(arr)
                localStorage.setItem('search_List', jsonstr)
                rander()
            }
        })

    })
    //点击清除记录按钮删除全部localstry
    $('.history').on('click', '.htop span:nth-child(2)', function () {
        mui.confirm('你确定要全部清除历史记录吗', '温馨提示', function (e) {
            if (e.index === 1) {
                localStorage.removeItem('search_List')
                rander()
            }
        })

    })
    //点击搜索获取input内容添加到localstory
    $('#select').on('click', function () {
        var str = $(this).siblings('input').val().trim()
        if (str.length <= 0) {
            mui.toast("请输入内容")
            return
        }
        var arr = gethistory() || []
        if (arr.length >= 5) {
            //删除最后一个
            arr.pop()
        }
        if (arr.indexOf(str) !== -1) {
            var index = arr.indexOf(str)
            arr.splice(index, 1)
        }
        arr.unshift(str)
        var jsonstr = JSON.stringify(arr)
        localStorage.setItem('search_List', jsonstr)
        rander()
        console.log(str);
        location.href = 'searchList.html?reset='+str
    })
})