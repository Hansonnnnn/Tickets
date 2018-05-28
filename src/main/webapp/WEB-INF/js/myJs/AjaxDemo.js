var xmlHttp;
if(window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlHttp = new XMLHttpRequest();
}else{
    // code for IE6, IE5
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// 如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：
// method：请求的类型；GET 或 POST
// url：文件在服务器上的位置
// async：true（异步）或 false（同步）
// send(string), string仅用于post
xmlHttp.open("GET", "text,txt", true);
xmlHttp.send();


xmlHttp.open("POST", "text.txt", true);
xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xmlHttp.send();

// XMLHttpRequest 对象如果要用于 AJAX 的话，其 open() 方法的 async 参数必须设置为 true：
// 当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：
xmlHttp.onreadystatechange = function () {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
    //    do something
    }
}

// 如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。
var resultText = xmlHttp.responseText;
var resultXml = xmlHttp.responseXML;
var text = "";
var x = resultXml.getElementsByTagName("ARTIST");
for(var i = 0;i < x.length;i++){
    text = x[i].childNodes[0].nodeValue + "<br/>"
}

//readyState-有五个状态，注意是onreadystatechange，不是成功，而是只要状态发生改变就可以，所以该方法会执行五次
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪
//status
//200: "OK"
// 404: 未找到页面   -----------------------当 readyState 等于 4 且status为 200 时，表示响应已就绪：

//callback 函数是一种以参数形式传递给另一个函数的函数
function myFunction()
{
    loadXMLDoc("ajax_info.txt",function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    });
}