function StringBuilder() {
    this._strings_ = [];
}

StringBuilder.prototype.append = function (str) {
    this._strings_.push(str);
};

StringBuilder.prototype.toString = function () {
    return this._strings_.join("");
};


var date1 = new Date();
var str = "";
for(var i= 0 ;i < 10000;i++){
    str += "text";
}
var date2 = new Date();
document.write("Concatenation with plus: " + (date2.getTime() - date1.getTime()) + " milliseconds");

date1 = new Date();
var stringBuilder = new StringBuilder();
for(var j = 0;j < 10000;j++){
    stringBuilder.append("text");
}
var result = stringBuilder.toString();
date2 = new Date();
document.write("<br />Concatenation with plus: " + (date2.getTime() - date1.getTime()) + " milliseconds");


