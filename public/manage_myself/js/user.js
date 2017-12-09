$(function () {
    // 定义变量
    var myPageNum = 1;
    var myPageSize = 5;
    // 因为要多次使用到 所以进行封装成函数
    function getData() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                // 渲染页面上
                $('tbody').html(template('userTmp', backData));
                // 功能二 分页插件 获取到之后才能使用到这个
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        // 重新获取也没
                        getData();
                    }
                });
            }
        })
    }
    getData();

    // 需求二  为启用和禁用绑定点击事件
    // 绑定父亲 因为它是动态生成的，它的爸爸父辈一直在那里 所以用穿透
    $('tbody').on('click', 'button', function () {
        // console.log传入的是一个字符串
        // console.log('点我了');
        // 获取id自定义属性
        var id = $(this).parent().attr('data-id');
        //判断启用还是禁用
        var isDelete = undefined;
        if ($(this).html() == '启用') {
            // console.log('启用');
            isDelete = 0;
        } else {
            // 禁用逻辑 
            isDelete = 1;
        }
        // console.log(id+ '|' + isDelete);
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (backData) {
                // console.log(backData);

                if(backData.success){
                    //重新获取数据
                    getData();
                }
            }
        })
    })


})