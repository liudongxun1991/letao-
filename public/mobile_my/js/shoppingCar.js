$(function(){
    // 下拉刷新
    mui.init({
        pullRefresh : {
          container:".lt_content",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            
            callback :function(){
                // 刷新本质是ajax获取数据
                $.ajax({
                    url: '/cart/queryCart',
                    success:function(backData){
                        console.log(backData);
                        
                        // 渲染
                        $('.lt_content').html(template('car' ,backData));
                    }
                })
                setTimeout(function(){
                    mui('#OA_task_2').pullRefresh().endPulldownToRefresh();

                },400)
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
     
          }
        }
      });
})