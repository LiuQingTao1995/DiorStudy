function check_login() {
    var name = $("#user_name").val();
    var pass = $("#password").val();
    if (name == "123" && pass == "123") {
        alert("登录成功！");
        $("#user_name").val("");
        $("#password").val("");
    }
    else {
        alert("登录失败！");
    }
}

function check_register() {
    var name = $("#r_user_name").val();
    var pass = $("#r_password").val();
    var email = $("r_email").val();
    if (name != "" && pass != "" && email != "") {
        alert("注册成功！");
        $("#user_name").val("");
        $("#password").val("");
    }
    else {
        alert("注册失败！");
    }
}

$(function () {
    $("#create").click(function () {
        check_register();
        return false;
    })
    $("#login").click(function () {
        check_login();
        return false;
    })
    $('.message a').click(function () {
        $('form').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });
})