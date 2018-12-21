$(function () {
    //初始化控件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    })
    //轮播图组件初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    
    
})