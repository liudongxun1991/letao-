$(function(){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:5,
        },

        success: function(backData){
            console.log(backData);
        }
    })
})