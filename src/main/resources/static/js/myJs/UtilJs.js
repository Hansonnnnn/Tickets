function getContextPath() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host + "/" + "Tickets";
}

function watchAttrChange() {
    var alt = $("#loginButton").attr("alt");
    var timer = setInterval(function () {
        var newAlt = $("#loginButton").attr("alt");
        if(newAlt !== alt){
            console.log(newAlt + "*****************");
            addPayButtonEvents();
            clearInterval(timer);
        }
    },100)

}