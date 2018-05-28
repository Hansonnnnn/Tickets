$(function () {

//    bPart.removeClass("disappear");
//    bPart.addClass("in");
    $("#inlineRadioA").click(function () {
        if($(this).prop("checked")){
            aPart.removeClass("disappear");
            aPart.addClass("in");
            bPart.addClass("disappear");
            bPart.removeClass("in");
            cPart.addClass("disappear");
            cPart.removeClass("in");
        }
    });
    $("#inlineRadioB").click(function () {
        if($(this).prop("checked")){
            aPart.addClass("disappear");
            aPart.removeClass("in");
            bPart.removeClass("disappear");
            bPart.addClass("in");
            cPart.addClass("disappear");
            cPart.removeClass("in");
        }
    });
    $("#inlineRadioC").click(function () {
        if($(this).prop("checked")){
            aPart.addClass("disappear");
            aPart.removeClass("in");
            bPart.addClass("disappear");
            bPart.removeClass("in");
            cPart.removeClass("disappear");
            cPart.addClass("in");
        }
    });


    //b区结束，c区开始

    //限定楼层，设置区数的部分
    var areaCtrlBlock = "<div class=\"row\" style='margin: 8px 0;'>\n" +
        "                        <div class=\"col-md-1 text-center col-md-offset-1\">\n" +
        "                            <h5></h5>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-1\">\n" +
        "                            <input type=\"number\" min=\"1\" max=\"30\" class=\"form-control areaInput\" value=\"1\"/>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-1 text-center\">\n" +
        "                            <h5>区</h5>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-1\">\n" +
        "                            <button type=\"button\" class=\"btn btn-default areaNxtBtn\">下一步</button>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-1\">\n" +
        "                            <button type=\"button\" class=\"btn btn-default areaRefreshBtn\" disabled>重新设置</button>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-md-12 appendArea\" id=\"\">\n" +
        "\n" +
        "                        </div>\n" +
        "                    </div>";
    var rowAndColumnBlock = "<div class=\"row\" style='margin: 8px 0;'>\n" +
        "                <div class=\"col-md-1 col-md-offset-2 text-center\">\n" +
        "                    <h5></h5>\n" +
        "                </div>\n" +
        "                <div class=\"col-md-1\">\n" +
        "                    <input type=\"number\" min=\"1\" max=\"50\" class=\"form-control rowInput\"/>\n" +
        "                </div>\n" +
        "                <div class=\"col-md-1 text-center\">\n" +
        "                    <h5>排</h5>\n" +
        "                </div>\n" +
        "                <div class=\"col-md-1\">\n" +
        "                    <input type=\"number\" min=\"1\" max=\"50\" class=\"form-control colInput\"/>\n" +
        "                </div>\n" +
        "                <div class=\"col-md-1 text-center\">\n" +
        "                    <h5>列</h5>\n" +
        "                </div>\n" +
        "            </div>";

    /**
     * 楼层部分下一步按钮事件----在appendArea添加元素
     */
    $(".floorNxtBtn").click(function () {
        //需要添加的层数---rows的行数
        var areaNum = $(this).parent().prev().prev().children().eq(0).val();
        //添加节点的容器
        var appendArea = $(this).parent().next().next();
        var h5;
        var areaNxtBtn;
        var areaRefreshBtn;
        //输入框中有多少层，就要append多少行
        for (var i = 0;i < areaNum;i++){
            appendArea.append(areaCtrlBlock);
            h5 = appendArea.children().eq(-1).children().eq(0).children().eq(0);
            h5.text((i + 1) + "F 共 ");

            //设置区部分下面的下一步和重新设置按钮的事件
            //为什么要把与无关的语句放到for循环中？每次都是取最后一个
            areaNxtBtn = appendArea.children().eq(-1).children().eq(3).children().eq(0);
            areaNxtBtn.click(function () {
                var rcNum = $(this).parent().prev().prev().children().eq(0).val();
                //添加节点的容器
                var appendArea = $(this).parent().next().next();
                var h5;
                //输入框中有多少区，就要append多少行
                for(var j = 0;j < rcNum;j++){
                    appendArea.append(rowAndColumnBlock);
                    h5 = appendArea.children().eq(-1).children().eq(0).children().eq(0);
                    h5.text((j + 1) + "区 共 ");
                }
                $(this).parent().next().children().eq(0).attr("disabled", false);
                $(this).attr("disabled", true);
            });
            areaRefreshBtn = areaNxtBtn.parent().next().children().eq(0);
            areaRefreshBtn.click(function () {
                var appendArea = $(this).parent().next();
                appendArea.children().remove();
                $(this).parent().prev().children().eq(0).attr("disabled", false);
                $(this).attr("disabled", true);
            });
        }
        //取消重新设置按钮为disabled
        $(this).parent().next().children().eq(0).attr("disabled", false);
        $(this).attr("disabled", true);
    });

    /**
     * 楼层部分刷新按钮事件----将appendArea内容全部移除
     */
    $(".floorRefreshBtn").click(function () {
        var appendArea = $(this).parent().next();
        appendArea.children().remove();
        $(this).parent().prev().children().eq(0).attr("disabled", false);
        $(this).attr("disabled", true);
    });


//    /**
//     * 用户操作不符合购票标准提示警示信息：如限购20张票
//     * @param text
//     */
//    function showWarningAlert(text) {
//        var alert = $("#bottomAlert");
//        alert.find("strong").test(test);
//        alert.addClass("in");
//    }
//    function closeWaringAlert() {
//        $("#bottomAlert").removeClass("in");
//    }

//    function showTopAlert(text) {
//        var alert = $("#topAlert");
//        alert.find("strong").test(test);
//        alert.addClass("in");
//    }
//    function closeTopAlert() {
//        $("#topAlert").removeClass("in");
//    }
    var json = {};
    function testInfo() {
        var pwd = $("#pwdInput").val();
        var confirmPwd = $("#confirmPwdInput").val();
        var name = $("#nameInput").val();
        var location = $("#locationInput").val();
        if(pwd !== confirmPwd){
            showTopAlert("两次输入的密码不一致，请您检查后重新输入！");
            return false;
        }
        if(pwd === "" || confirmPwd === "" || location === "" || name === ""){
            showTopAlert("请您检查输入信息的完整性！");
            return false;
        }
        // json.push({"password": pwd, "name": name, "location":location, "type":"a","seatsConfig":[]});
        json.password = pwd;
        json.name = name;
        json.location = location;
        return true;
    }
    function aSubmit(){
        if(testInfo()){
            var resultArray = submit("a");
            // json.seatsConfig.push(resultArray);
            json.seatsConfig = resultArray;
            json.type = "a";
            console.log(JSON.stringify(json));
            $.ajax({
                type: 'post',
                url: window.location.href + "/aSubmit",
                data: json,
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, status) {
                    console.log("成功返回数据: " + data);
                    var username = data;
                    /*[+
                        var msg = 'This is a working application';
                    +]*/

                    window.location.href = getContextPath() + "/scenter?" + "username=" + username;
                },
                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function (error) {
                    console.log(error.responseText);
                    var username = error.responseText;
                    window.location.href = getContextPath() + "/scenter?" + "username=" + username;
                }
            });
        }
    }
    function bSubmit(){
        if(testInfo()){
            var resultArray = submit("b");
            // json.seatsConfig.push(resultArray);
            json.seatsConfig = resultArray;
            json.type = "b";
            console.log(JSON.stringify(json));
            $.ajax({
                type: 'post',
                url: window.location.href + "/bSubmit",
                data: json,
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, status) {
                    console.log("成功返回数据: " + data);
                    var username = data;
                    /*[+
                        var msg = 'This is a working application';
                    +]*/

                    window.location.href = getContextPath() + "/scenter?" + "username=" + username;
                },
                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function (error) {
                    console.log(error.responseText);
                    var username = error.responseText;
                    window.location.href = getContextPath() + "/scenter?" + "username=" + username;
                }
            });
        }
        // var resultArray = submit("b");
        // // json.seatsConfig.push(resultArray);
        // json.seatsConfig = resultArray;
        // json.seatType = "b";
        // console.log(JSON.stringify(json));
        // $.ajax({
        //     type: 'post',
        //     url: window.location.href + "/bSubmit",
        //     data: json,
        //     beforeSend: function (XMLHttpRequest) {
        //
        //     },
        //     success: function (data, status) {
        //         console.log("成功返回数据: " + data);
        //         var username = data;
        //         window.location.href = getContextPath() + "/scenter?" + "username=" + username;
        //     },
        //     complete: function (XMLHttpRequest, textStatus) {
        //
        //     },
        //     error: function (error) {
        //         console.log(error.responseText);
        //         var username = error.responseText;
        //         window.location.href = getContextPath() + "/scenter?" + "username=" + username;
        //     }
        // });
    }
    //发送数据时调用的方法
    /**
     * c方案提交方法执行过程
     * @returns {Array} 以这样的数据结构返回[floor, area, row, col]
     */
    function addTotal() {
        //要获得什么数据：层、区、行、列，以怎样的形式传给bl层[floor, area, row, col]
        var finalResult = [];
        finalResult[0] = [];
        var floorNumInput = $(".floorInput");
        var areaNumInputSet = floorNumInput.parent().next().next().next().next().find(".areaInput");
        var rowNumInputSet = [];
        var rowNum;
        var colNumInputSet = [];
        var colNum;
        //层数：floorNum: areaNumInputSet.length
        //每层区数：areaNum: rowNumInputSet[i].length
        //每区排数：rowNumInputSet[i].eq(j).val()
        //每区列数：colNumInputSet[i].eq(j).val()
        var floorNum = areaNumInputSet.length;
        var areaNum = 0;
        for (var i = 0;i < floorNum;i++){
            rowNumInputSet[i] = areaNumInputSet.eq(i).parent().next().next().next().next().find(".rowInput");
            colNumInputSet[i] = areaNumInputSet.eq(i).parent().next().next().next().next().find(".colInput");
            areaNum = rowNumInputSet[i].length;
            for(var j = 0;j < areaNum;j++){
                rowNum = rowNumInputSet[i].eq(j).val();
                colNum = colNumInputSet[i].eq(j).val();
                finalResult[i][j] = floorNum + ";" + areaNum + ";" + rowNum + ";" + colNum;
            }
        }
        return finalResult;
    }
    var isFirstClick = true;
    function cSubmit(){
        testInfo();
        if(isFirstClick){
            showWarningAlert("请您仔细检查座位安排情况后再提交！");
            isFirstClick = false;
        }else{
            closeWaringAlert();
            //执行提交方法
            if(pwd !== confirmPwd){
                showTopAlert("两次输入的密码不一致，请您检查后重新输入！");
                return;
            }
            if(pwd === "" || confirmPwd === "" || location === ""){
                showTopAlert("请您检查输入信息的完整性！");
                return;
            }
            var result = addTotal();//拿到返回的结果

        }
    }

    $("#aSubmitButton").click(function () {
        aSubmit();
    });
    $("#bSubmitButton").click(function () {
        bSubmit();
    });
    $("#cSubmitButton").click(function () {
        cSubmit();
    });
})