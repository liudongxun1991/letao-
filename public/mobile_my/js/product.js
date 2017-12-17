$(function () {
    // 需求1   需求1
    // 获取通过url传递过来的数据
    var searchValue = window.location.search;

    var Id = searchValue.split('=')[1];
    var id = parseInt(Id);
    console.log(id);
    /*
        需求2
            ajax查询商品的详细信息
    */
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (backData) {
            console.log(backData);
            // 渲染页面


            $('.lt_content').html(template('product', backData));
            // 手动执行轮播图部分

            // 动态生成span
            var startIndex = parseInt(backData.size.split('-')[0]);
            var endIndex = parseInt(backData.size.split('-')[1]);

            for (var i = startIndex; i <= endIndex; i++) {
                // 动态生成的 回调函数里面就好
                $("<span class='size'>" + i + "</span>").appendTo('.size-list');
            }
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

            });

            // 为第一个 轮播点 增加 mui-active类名即可
            $('.mui-slider-indicator').children('div').first().addClass('mui-active');

            // 初始化 数字选择 还是按照文档【表情】
            mui('.mui-numbox').numbox();

            // 按照结构再调用一次
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
                indicators: false //是否显示滚动条

            });
        }
    })

    // 需求四 点击span 高亮自己 排他
    $('.lt_content').on('click', 'span.size', function () {
        // 
        $(this).addClass('active').siblings('span').removeClass('active');
    })

    /*
    需求4
    点击加入购物车
    如果没用登陆 会有提示 
    根据提示 跳转到 登陆页即可
    */
    $('.lt_footer.product .mui-btn-danger').click(function(){
        $.ajax({
            url: '/cart/addCart',
            data:{
                productId: id,
                num: $('.mui-numbox-input').val(),
                size: $('span.active').html(),
            },
            type: 'post',
            success: function(backData){
                console.log(backData);
                if(backData.error == 400){
                    window.location.href = './login.html';

                }else{
                    window.location.href = 'shoppingCar.html';
                }
            }
        })
    })

})