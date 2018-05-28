$(function () {
    var email = $("#loginButton").attr("alt");
    if(email){
        $("#loginButton").addClass("disappear");
        $("#personCenterButton").removeClass("disappear").click(function () {
            window.location.href = getContextPath() + "/personalCenter?email=" + email;
        });
    }

    $("#stadiumSignIn").click(function () {
        window.location.href = getContextPath() + "/sregister";
    });

});