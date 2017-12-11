$(function () {
    function getData() {
        // 定义变量
        var myPageNum = 1;
        var myPageSize = 5;
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                // console.log(backData);
                $('tbody').html(template('productsTmp', backData));
                // 调用分页插件
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        // 再调用一次
                        getData();
                    }
                });
            }
        })
    }
    // 默认调用一次
    getData();
    // 功能三实现 图片的上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data.result.picAddr);
            // 拿到图片的src地址了 
            $('<img style="width:100px; height=100px" src="' + data.result.picAddr + '" />').appendTo('form .form-group:last');
        }
    });
    // 新增功能四 判断第三个图片的时候 不允许用户添加
    $('#fileupload').click(function (event) {
        if ($('form .form-group:last img').length == 3) {
            event.preventDefault();
            // 阻止默认事件（点击）
        }
        // console.log('你点我了');
    })
    // 新增功能五 双击就删除掉图片（可以用一个span表示叉）
    $('form .form-group').on('dblclick', 'img', function () {
        $(this).remove();
    })

    //表单验证逻辑
    $('form').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            proName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            oldPrice: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            price: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            proDesc: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            size: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            statu: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            num: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            brandId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log('成功了');
    })
    //产品新增模块
    // 格式化表单 要有name属性
    $('.btnAdd').click(function(){
        $.ajax({
            url : '/product/addProduct',
            type: 'post',
            data:$('form').serialize(),
            success: function(backData){
                console.log(backData);
                if(backData.success ==true){
                    $('.productsmodal').modal('hide');
                }
            }
        })
    })
})