var myChart1 = echarts.init(document.querySelector('.zhuzhuangtu'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2017注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [100, 300, 506, 600, 200, 100]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);

var myChart2 = echarts.init(document.querySelector('.binzhuangtu'));

var option2 = {
        title : {
            text : '热门品牌销售',
            subtext:'2017年6月',
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['耐克','阿迪','新百伦','老北京','老奶奶']
        },
        series: [
            {
                name:'品牌',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'老北京'},
                    {value:1548, name:'老奶奶'}
                ]
            }
        ]
}
myChart2.setOption(option2);