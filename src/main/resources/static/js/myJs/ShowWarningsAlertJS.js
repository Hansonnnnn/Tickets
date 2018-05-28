/**
 * 用户操作不符合购票标准提示警示信息：如限购20张票
 * @param text
 */
function showWarningAlert(text) {
    var alert = $("#bottomAlert");
    alert.find("strong").text(text);
    alert.addClass("in");
}

function closeWaringAlert() {
    $("#bottomAlert").removeClass("in");
}

function showTopAlert(text) {
    var alert = $("#topAlert");
    alert.find("strong").text(text);
    alert.addClass("in");
}

function closeTopAlert() {
    $("#topAlert").removeClass("in");
}