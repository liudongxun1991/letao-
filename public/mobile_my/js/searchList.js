$(function(){
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
    function getData(searchValue){
        $.ajax({
            url: '/product/queryProduct',
            data:{
                proName: searchValue,
                page: 1,
                pageSize: 888,
            },
                success: function(backData){
                    console.log(backData);
                    $('.product-list ul').html(template('product' , backData));
                }
        })
    }
    getData(searchValue);
    // 点击form中的button 进行渲染 进行更一步的优化
    $('.search-form button').click(function(e){
        e.preventDefault();
        getData($(this).prev().val()); 
    })
})