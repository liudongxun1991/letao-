$(function () {
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
  });

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  // 点击所有的返回按钮做跳转到上一层 点击主目录跳转到首页 tap事件
  $('span.fa-home').on('tap' ,function(){
      window.location.href = './index.html';
  })
  $('span.fa-search').on('tap',function(){
      window.location.href = 'search.html';
  })
  $('span.fa-chevron-left').on('tap' , function(){
    	// 点击返回箭头 回到上一次的历史记录s
    window.history.back();
  })
})