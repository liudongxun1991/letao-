// 入口函数
$(function () {
    // 1 测试代码
    // $('button[type=submit]').click(function (event) {
    // 默认行为是整页提交，所以才阻止
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         data: $("form").serialize(),
    //         type: 'post',
    //         success: function (backData) {
    //             console.log(backData);
    //         }
    //     })
    // })
    // 会报错的原因是上面的代码阻止了默认行为，所以要先注释

    //=======================华丽的分割线
    // 功能二
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback: {
                        message: "用户名不存在"
                    }

                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

        // 提交之后加载进度条
        NProgress.start();

        //使用ajax提交逻辑 前面的是本地验证，ajax请求的话要在回调函数里
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: $('#inputEmail1').val(),
                password: $('#inputPassword2').val()
            },
            // data: $("form").serialize(),
            success: function (backData) {

                if (backData.success) {
                    window.location.href = './index.html';
                } else {
                    if (backData.error == 1000) {
                        console.log('用户名不正确');
                        //更新字段的状态
                        var validator = $("form").data('bootstrapValidator');
                        validator.updateStatus('username', 'INVALID', 'callback');
                    } else if (backData.error == 1001) {
                        var validator = $("form").data('bootstrapValidator');
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
                // 回调函数（从服务器转了一圈回来了）
                //关闭进度条
                setTimeout(function () {
                    NProgress.done();
                }, 1000)
            }
        })

    });
    // 功能三 为表单绑定点击事件
    $('button[type=reset]').click(function () {
        // 首先获取对象
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm(); //重置表单，并且会隐藏所有的错误提示和图标
    })
})



/*
// 测试进度条 进度条插件
// 将进度条插件加载到表单验证里 
NProgress.start();
//关闭进度条
setTimeout(function () {
    NProgress.done();
}, 2000)
*/