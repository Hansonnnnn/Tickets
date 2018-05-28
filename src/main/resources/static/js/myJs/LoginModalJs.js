$(function () {
    var username, password, confirmPassword, email, validationInputCode;
    var validationCode;
    function updateSignInBlockLabelsValue() {
        email = $("#sign-in-email-field").val();
        password = $("#sign-in-password-field").val();
    }
    function updateSignUpBlockLabelsValue() {
        username = $("#sign-up-username-field").val();
        password = $("#sign-up-password-field").val();
        confirmPassword = $("#sign-up-confirmPassword-field").val();
        email = $("#sign-up-email-field").val();
        validationInputCode = $("#sign-up-validation-field").val();
    }

    $("#getValidationButton").click(function () {
        updateSignUpBlockLabelsValue();
        //调用后端发送邮件方法，获取验证码
        var json = {};
        json.email = email;
        $.ajax({
            type: 'post',
            url: getContextPath() + "/login/getValidation",
            data: json,
            success: function (data) {
                validationCode = data;
                console.log("随机验证码为：" + data);
            }
        })
    });

    //登录方法还没实现，登录之后，将登录按钮换成个人中心
    $("#signInButton").click(function () {
        updateSignInBlockLabelsValue();
        var user = {};
        user.email = email;
        user.password = password;
        console.log("email: " + email);
        console.log("password: " + password);
        $.ajax({
            type: 'post',
            url: getContextPath() + "/login/signIn",
            data: user,
            success: function (data) {
                if(data){
                    $("#personCenterButton").removeClass("disappear").click(function () {
                        window.location.href = getContextPath() + "/personalCenter?email=" + email;
                    });
                    $("#loginButton").addClass("disappear");
                    $("#loginButton").attr("alt", email);
                    // addPayButtonEvents();
                    $("#loginModal").modal("hide");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });

    //注册方法还没实现
    $("#signUpButton").click(function () {
        updateSignUpBlockLabelsValue();
        if((username !== "")&&(password !== "")&&(password === confirmPassword)&&(email !== "")&&
            (validationInputCode === validationInputCode)){
            var json = {};
            json.username = username;
            json.password = password;
            json.email = email;
            $.ajax({
                type: 'post',
                url: getContextPath() + "/login/signUp",
                data: json,
                success: function (data) {
                    if(data){
                        $("#personCenterButton").data("email", email);
                        $("#personCenterButton").removeClass("disappear").click(function () {
                            window.location.href = getContextPath() + "/personalCenter?email=" + email;
                        });
                        $("#loginModal").modal("hide");
                        $("#loginButton").addClass("disappear");
                    }
                },
                error: function (error) {
                    console.log("signUp error : " + error);
                }
            })
        }else{
            alert("请检查输入信息是否完整，及验证码是否正确！")
        }
    })


})