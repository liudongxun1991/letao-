$(function () {
    // 使用jq一样
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (backData) {
            console.log(backData);
            $('.nav_left ul').html(template('leftList' , backData));
            //默认都一个高亮
            $('.nav_left ul li').eq(0).find('a').click();
        }
    })
    // 需求二 点击高亮 可以用click事件 动态生成的
    //用ajax获取对应的数据
    $('.nav_left ul').on('click' , 'a' ,function(){
       
        $(this).parent().addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/category/querySecondCategory',
            data:{
                id:id,
            },
            success:function(backData){
                console.log(backData);
                $('.lt_right ul').html(template('rightList' , backData));
            }
        })
    })
    
    

})