$(function(){
    // 首先就要判断用户是否登陆 强制打回 逻辑比较多
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(backData){
            console.log(backData);
            // 每一个都要验证 抽取出来
            if(backData.error == 400){
                window.location.href = './login.html';
            }
        }
    })

    // 侧边栏的收展开 上下执行解析有时间关系
    $('.main-right .glyphicon-tasks').click(function(){
        $('.main-left').toggle();
        $('.main-right').toggleClass('current');
    })


    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('maintubiao'));
    
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [1000, 2000, 3000, 4000, 5000, 6000]
        }]
    };
        myChart.setOption(option);

     // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('maintubiao2'));
    
    // 饼图部分
    option2 = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'安踏'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);

        // 模态框
        $('.modal-content .modal-footer button[type="submit"]').click(function(){
            // 关闭模态框
            $('.modal-content').modal('hide')
            $.ajax({
                url: '/employee/employeeLogout',
                success: function(backData){
                    
                    if(backData.success == true){
                        window.location = 'login.html';
                    }
                }
            })
        })
})