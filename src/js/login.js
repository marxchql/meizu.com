import $ from './jquery.js';

$(function() {
    // 验证登录
    // console.log(34535534534535);
    $("#phone").on('input', function() {
        let ze1 = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        if ($("#phone").val() == "") {
            $(this).removeAttr('data-pass');
            $('.phone').html('请输入用户名！');
            $("#phone").css({
                "border-color": "red"
            })
        } else if (ze1.test($("#phone").val()) == false) {
            $(this).removeAttr('data-pass');
            $('.phone').html('用户名只能是字母、数字、汉字！');
            $("#phone").css({
                "border-color": "red"
            })
        } else {
            $(this).attr('data-pass', true);
            $('.phone').html('');
            $("#phone").css({
                "border-color": "rgb(177, 177, 177)"
            })

        }
        check();
    });
    // 验证密码
    $("#password").on('input', function() {
        // let ze2 = /^[0-9]{6,18}$/;
        let ze2 = /^\w{6,18}$/;
        if ($("#password").val() == "") {
            $(this).removeAttr('data-pass');
            // $('.err').css('border', '1px solid red');
            $('.password').html('请输入密码！');
            $("#password").css({
                "border-color": "red"
            })
        } else if (ze2.test($("#password").val()) == false) {
            $(this).removeAttr('data-pass');
            // $('.err').css('border', '1px solid red');
            $('.password').html('密码只能是6-18位的数字！');
            $("#password").css({
                "border-color": "red"
            })
        } else {
            $(this).attr('data-pass', true);
            $("#password").css({
                    "border-color": "rgb(177, 177, 177)"
                })
                // $('.err').css('border', 'none');
            $('.password').html('');
        }
        check();
    });

    $('.rem').on('click', () => {
        console.log(1);
        if ($('.checkbox').attr("checked")) {

            $('.checkbox').removeAttr("checked")
        } else {

            $('.checkbox').attr("checked", "checked")
        }
    })

    function check() {
        if ($('[data-pass=true]').length == 2) {
            $('#login').css({
                // "background-color": " rgb(0, 84, 240);"
                "background-color": "rgb(0, 84, 240);"
            })
        } else {
            $('#login').removeAttr('style');
        }
    }

    // yanzhenghouduan






    $('#login').on('click', function() {
        console.log(3333);
        $.ajax({
            type: "post",
            url: "../../interface/login.php",
            data: {
                "phone": $('#phone').val(),
                "password": $('#password').val(),
            },
            dataType: 'json',
            success: function(res) {
                if (res.login) {
                    // console.log(res);

                    alert(res.msg);
                    location.href = "../html/index.html"
                } else {
                    alert(res.msg);
                    location.href = "../html/login.html"

                }
            }
        });
    })
})