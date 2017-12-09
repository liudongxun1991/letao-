/*
    都要用到判断 所以抽取
*/

$(function () {
    // 首先就要判断用户是否登陆 强制打回 逻辑比较多
    $.ajax({
        url: '/employee/checkRootLogin',
        type: 'get',
        success: function (backData) {
            // 每一个都要验证 抽取出来
            if (backData.error == 400) {
                window.location.href = './login.html';
            }
        }
    })

    // 侧边栏的收展开 上下执行解析有时间关系
    $('.main-right .glyphicon-tasks').click(function () {
        $('.main-left').toggle();
        $('.main-right').toggleClass('current');
    })

    // 模态框
    $('.modal-content .modal-footer button[type="submit"]').click(function () {
        // 关闭模态框
        $('.modal-content').modal('hide')
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (backData) {

                if (backData.success == true) {
                    window.location = 'login.html';
                }
            }
        })
    })
})