import $ from './jquery.js';
// 验证登录
$("#phone").on('input', function() {
    let ze1 = /^[1][3-9]\d{9}$/;
    if ($("#phone").val() == "") {
        $(this).removeAttr('data-pass');

        $('.phone').html('请输入11位数字手机号！');
        $("#phone").css({
            "border-color": "red"
        })
    } else if ($(this).val()[0] !== '1') {
        $(this).removeAttr('data-pass');

        $('.phone').html('号码第一位是1啊！宝贝！');
        $("#phone").css({
            "border-color": "red"
        })
    } else if ($(this).val()[1] == '2') {
        $(this).removeAttr('data-pass');

        $('.phone').html('手机号第二位不能是2！');
        $("#phone").css({
            "border-color": "red"
        })
    } else if (ze1.test($("#phone").val()) == false) {
        $(this).removeAttr('data-pass');

        $('.phone').html('请输入11位数字手机号！');
        $("#phone").css({
            "border-color": "red"
        })
    } else {
        $('.phone').html('');
        $(this).attr('data-pass', true);
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

$("#email").on('input', function() {
    // let ze2 = /^[0-9]{6,18}$/;
    let ze2 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    // console.log($(this).val()[1]);
    if ($("#email").val() == "") {
        $(this).removeAttr('data-pass');
        // $('.err').css('border', '1px solid red');
        $('.email').html('请输入邮箱！');
        $("#email").css({
            "border-color": "red"
        })
    } else if (ze2.test($("#email").val()) == false) {
        $(this).removeAttr('data-pass');

        // $('.err').css('border', '1px solid red');
        $('.email').html('邮箱不规范！');
        $("#email").css({
            "border-color": "red"
        })
    } else {
        $(this).attr('data-pass', true);
        $("#email").css({
                "border-color": "rgb(177, 177, 177)"
            })
            // $('.err').css('border', 'none');
        $('.email').html('');
    }
    check();
});

function check() {
    if ($('[data-pass=true]').length == 3) {
        $('#login').css({
            // "background-color": " rgb(0, 84, 240);"
            "background-color": "rgb(0, 84, 240)"
        })
    } else {
        $('#login').removeAttr('style')

    }
}

$('#login').on('click', function() {
    $.ajax({
        type: "post",
        url: "../../interface/register.php",
        data: {
            "phone": $('#phone').val(),
            "password": $('#password').val(),
            "email": $('#email').val(),
        },
        dataType: 'json',
        success: function(res) {
            if (res.register) {
                // console.log(res);

                alert(res.msg);
                location.href = "../html/login.html"
            } else {
                alert(res.msg);
                location.href = "../html/register.html"

            }
        }
    });
})