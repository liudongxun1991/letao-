$(function () {
    $('form button[type=submit]').click(function (e) {
        event.preventDefault();
        // console.log('111');
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: $('form').serialize(),
            success: function (backData) {
                console.log(backData);
                if (backData.success) {
                    mui.toast("欢迎回来");
                    setTimeout(function () {
                        // 从哪来 回哪去
                        window.history.back();
                    }, 1000)
                } else {
                    mui.toast("你是本人吗!!!!😘");
                }
            }
        })
    })
})