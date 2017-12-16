$(function () {
    console.log(window.location.href);
    //以等号切割
    // 改进 屏蔽了地址栏的空格等其他的东西
    var search = window.location.search;
    // console.log(searchValue);
    var searchKey = search.slice(1);
    // console.log(searchKey);
    var result = window.location.href.split('=');
    var searchValue = result[1];
    $('.search-form input').val(searchValue);

    //需求二 ajax渲染页面
    // 打包成函数
    function getData(option) {
        $('.product-list ul').html('');

        $.ajax({
            url: '/product/queryProduct',
            data: {
                proName: option.searchKey,
                page: 1,
                pageSize: 888,
                // 逻辑短路 或
                num: option.numOrder || 2,
                // 价格排序
                price: option.priceOrder || 2,
            },
            success: function (backData) {
                // console.log(backData);
                $('.product-list ul').html(template('product', backData));
            }
        })
    }
    getData({
        searchKey: searchKey
    });

    // 需求三 点击form中的button 进行渲染 进行更一步的优化
    $('.search-form button').click(function (e) {
        e.preventDefault();
        getData($(this).prev().val());
    })


    //需求4 点击切换 箭头 颜色
    $('.option-list').on('click', 'a', function () {
        $(this).parent().addClass('active').siblings('li').removeClass('active');
        $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');

        // 有个排序和升序问题
        if ($(this).find('span').hasClass('fa-angle-up')) {
            getData({
                searchKey: searchKey,
                priceOrder: 2,
            })
        } else {
            getData({
                searchKey: searchKey,
                priceOrder: 1,
            })
        }
    })
    // 需求六 点击立即购买 去详情页
    $('.product-list ul').on('click' , 'button' ,function(){
        var id = $(this).attr('data-id');//需要带id 就保存在里面
        window.location.href = './shoppingCar.html?id='+id;
        // console.log(id);
    })
})
