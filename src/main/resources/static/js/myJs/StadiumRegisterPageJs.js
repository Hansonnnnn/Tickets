$(function () {
    $("#nextStepBtn").click(function () {
        window.location.href = getContextPath() + "/infoFill";
    });

    $("#stadiumSignInButton").click(function () {
        var username = $("#usernameField").val();
        var password = $("#passwordField").val();
        console.log(username + password);
        var json = {};
        json.username = username;
        json.password = password;
        $.ajax({
            type: 'post',
            url: getContextPath() + "/sregister/login",
            data: json,
            success: function (data) {
                if(data){
                    console.log("登录成功");
                    window.location.href = getContextPath() + "/scenter?" + "username=" + username;
                }else{
                    alert("密码错误！请检查后重新输入");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    })
})