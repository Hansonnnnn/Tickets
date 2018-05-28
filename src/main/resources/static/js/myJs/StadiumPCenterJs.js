$(function () {
    //有一个需求没有解决：修改场地，然后等待审核
    //有一个bug，三维数组的使用，看看InfoFilloutPage是怎么搞的--解决了
    var username = window.location.search.substr(10, window.location.search.length);
    var name = "";
    var location = "";
    var lastModifiedTime = "";
    var check_status = "";
    var seatsType = "";
    var seatsConfig = [];
    //要返回xydata
    // var xyData = [
    //     //a
    //     "0-0-0-0","0-0-1-1","0-0-2-1","0-0-3-1","0-0-4-1","0-0-5-1","0-0-6-1","0-0-7-1","0-0-8-1",
    //     "0-1-0-1","0-1-1-1","0-1-2-1","0-1-3-1","0-1-4-1","0-1-5-1","0-1-6-1","0-1-7-1","0-1-8-1",
    //     //b
    //     "1-0-0-1","1-0-1-1","1-0-2-1","1-0-3-1","1-0-4-1","1-0-5-1","1-0-6-1","1-0-7-1","1-0-8-1",
    //     "1-1-0-1","1-1-1-1","1-1-2-1","1-1-3-1","1-1-4-1","1-1-5-1","1-1-6-1","1-1-7-1","1-1-8-1"
    // ];
    $.ajax({
        type: 'post',
        url: getContextPath() + "/scenter/data?" + "username=" + username,
        success: function (data, status) {
            name = data.name;
            location = data.location;
            lastModifiedTime = new Date(data.lastDate).toLocaleString();
            check_status = data.status;
            seatsType = data.type;
            seatsConfig = data.seatsConfig;

            console.log("成功返回数据: " + data.status);
            $("#snameField").val(name);
            $("#slocationField").val(location);
            $("#lastModifiedTimeLabel").text(lastModifiedTime);
            if(check_status === "Success"){
                $("#statusLabel").removeClass("label-warning").addClass("label-success").text(check_status);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            addEventListeners();
            drawSeats();
        },
        error: function (error) {
            console.log(error);
        }
    });
    /**
     * 设置欢迎信息
     **/
    // function randomString(len) {
    //     len = len || 32;
    //     var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    //     var maxPos = $chars.length;
    //     var pwd = '';
    //     for (var i = 0; i < len; i++) {
    //         pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    //     }
    //     return pwd;
    // }
    var welcomeText = "尊敬的：" + username + " 用户，您好！" + "<small>请记住您的用户名，登录时使用。</small>";
    $("#welcomeText").html(welcomeText);
    /**
     * 设置欢迎信息结束
     **/

    /**
     * 思路：
     * 一跳转到这个界面，所有的座位全在，但是都没打对勾，并且座位图隐藏----后台自动按照前一个界面的座位勾选情况绘制座位
     * 绘制过程：
     * 1.a区，找到a块，设置其[x，y]位，为显示or不显示（设置其css属性visibility）--不是是否勾选，而是是否显示
     * 2.传递过来的数据；就是最初生成的格式，在此界面对每个元素进行解析
     * 3.怎样解析每个元素？目前已经拿到分割开的数据, 0区,0行,0列,1
     *   0区找到a_0块---》找到其下面所有行，找到0行---》找到0列---》按照value值设置其visibility属性
     * 点击"设置（座位）"按钮，将其显示
     *
     *
     * 现在的思路是：先把所有的checkbox取出来，再放到二维数组里面，再按照元素坐标去设置每个checkbox
     */
//添加的结构是怎样的？
    function drawSeats() {
        //取到结构框架的元素
        //a方案
        var aPlan = $("#aPlan");
        //area set
        var a_area_set = aPlan.find(".seatsBlock").eq(0).find(".areaBlock");
        console.log("a_area_set size:" + a_area_set.length);
        //row set
        var a_area_rows_set;
        //col set----数据结构是怎么组织的？
        var a_area_cols_set;
        //元素组成的二维数组
        var a_area_ele_set = [];
        a_area_ele_set[0] = [];
        a_area_ele_set[0][0] = [];
//            tempSet[0] = [];
        for(var i = 0;i < a_area_set.length;i++){
            a_area_rows_set = a_area_set.eq(i).find(".row");
            var tempSet = [];
            for(var j = 0;j < a_area_rows_set.length-1;j++){
                tempSet[j] = [];
                a_area_cols_set = a_area_rows_set.eq(j).find("input[type='checkbox']");
                for(var k = 0;k < a_area_cols_set.length;k++){
                    tempSet[j][k] = a_area_cols_set.eq(k);
                }
            }
            a_area_ele_set[i] = tempSet;
        }
//            console.log(a_area_ele_set);
        //b方案
        var bPlan = $("#bPlan");
        var b_area_set = bPlan.find(".seatsBlock").eq(0).find(".areaBlock");
        //row set
        var b_area_rows_set;
        //col set----数据结构是怎么组织的？
        var b_area_cols_set;
        //元素组成的二维数组
        var b_area_ele_set = [];
        b_area_ele_set[0] = [];
        b_area_ele_set[0][0] = [];
//            tempSet[0] = [];
        for(var i = 0;i < b_area_set.length;i++){
            b_area_rows_set = b_area_set.eq(i).find(".row");
            var tempSet = [];
            for(var j = 0;j < b_area_rows_set.length-1;j++){
                tempSet[j] = [];
                b_area_cols_set = b_area_rows_set.eq(j).find("input[type='checkbox']");
                for(var k = 0;k < b_area_cols_set.length;k++){
                    tempSet[j][k] = b_area_cols_set.eq(k);
                }
            }
            b_area_ele_set[i] = tempSet;
        }
        //数据结构[区号,[行号,[列号，是否已经被勾选(0 or 1)]]]
//            var xyData = [
//                //a-1-n
//                [0,[0,[0, 1]]],[0,[0,[1, 1]]],[0,[0,[2, 1]]],[0,[0,[3, 1]]],[0,[0,[4, 1]]],[0,[0,[5, 1]]],
//                [0,[0,[6, 1]]],[0,[0,[7, 1]]],[0,[0,[8, 1]]],
//                //a-2-n
//                [0,[1,[0, 1]]],[0,[1,[1, 1]]],[0,[1,[2, 1]]],[0,[1,[3, 1]]],[0,[1,[4, 1]]],[0,[1,[5, 1]]],
//                [0,[1,[6, 1]]],[0,[1,[7, 1]]],
//                //b-1-n
//                [1,[0,[0, 1]]],[1,[0,[1, 1]]],[1,[0,[2, 1]]],[1,[0,[3, 1]]],[1,[0,[4, 1]]],[1,[0,[5, 1]]],
//                [1,[0,[6, 1]]],[1,[0,[7, 1]]],[1,[0,[8, 1]]]
//            ];

        // var xyData = [
        //     //a
        //     "0-0-0-0","0-0-1-1","0-0-2-1","0-0-3-1","0-0-4-1","0-0-5-1","0-0-6-1","0-0-7-1","0-0-8-1",
        //     "0-1-0-1","0-1-1-1","0-1-2-1","0-1-3-1","0-1-4-1","0-1-5-1","0-1-6-1","0-1-7-1","0-1-8-1",
        //     //b
        //     "1-0-0-1","1-0-1-1","1-0-2-1","1-0-3-1","1-0-4-1","1-0-5-1","1-0-6-1","1-0-7-1","1-0-8-1",
        //     "1-1-0-1","1-1-1-1","1-1-2-1","1-1-3-1","1-1-4-1","1-1-5-1","1-1-6-1","1-1-7-1","1-1-8-1"
        // ];

        var cur_ele;
        var cur_ele_data = [];
        var blockNum = 0;
        var rowNum = 0;
        var colNum = 0;
        var value = "";
        var selt = "";

        if(seatsType === "a"){
            for(var i = 0;i < seatsConfig.length;i++){
                cur_ele_data = seatsConfig[i].split("-");
                blockNum = cur_ele_data[0];
                rowNum = cur_ele_data[1];
                colNum = cur_ele_data[2];
                value = cur_ele_data[3];
                selt = cur_ele_data[4];
                if(value === "0"){
                    cur_ele = a_area_ele_set[blockNum][rowNum][colNum];
                    cur_ele.css("visibility", "hidden");
                    cur_ele.attr("disabled", true);
                }
            }
        }else{
            for(var i = 0;i < seatsConfig.length;i++){
                cur_ele_data = seatsConfig[i].split("-");
                blockNum = cur_ele_data[0];
                rowNum = cur_ele_data[1];
                colNum = cur_ele_data[2];
                value = cur_ele_data[3];
                selt = cur_ele_data[4];
                if(value === "0"){
                    cur_ele = b_area_ele_set[blockNum][rowNum][colNum];
                    cur_ele.css("visibility", "hidden");
                    cur_ele.attr("disabled", true);
                }
            }
        }

    }

    function addEventListeners() {
        $('#planManagementTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            console.log("planManagementBlock click!");
            var usernameJson = {};
            usernameJson.username = username;
            $.ajax({
                type: 'post',
                url: getContextPath() + "/scenter/getPlansData",
                data: usernameJson,
                success: function (data) {
                    console.log(data);
                    //调用appendPlanBlock()
                    console.log("data.pricesConfig" + data.pricesConfig);
                    //传过来的是planvo的数组，没个应该调用一次append方法
                    for(var i = 0;i < data.planList.length;i++){
                        var cur_ele = data.planList[i];
                        appendPlanBlock(cur_ele.pname, cur_ele.purl, cur_ele.pdate, cur_ele.ptype, cur_ele.pdes, cur_ele.pricesConfig);
                    }

                },
                error: function (error) {
                    console.log(error);
                }
            })
        });
        var planInitBlock = "<div class=\"row blockBorder\">\n" +
            "                <div class=\"row\">\n" +
            "                    <div class=\"col-md-2\">\n" +
            "                       <div class=\"text-center\">\n" +
            "                            <img width=\"200px\" style=\"margin-left: 20px\" src=\"\"/>\n" +
            "                        </div>"+

            "                    </div>\n" +
            "                    <div class=\"col-md-8\">\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-md-11\">\n" +
            "                                <form class=\"form-horizontal\">\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动名称</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"活动名称\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动海报</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control urlField\" placeholder=\"活动海报url\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>"+
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动时间</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"datetime-local\" class=\"form-control\" placeholder=\"活动时间\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动类型</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control\" placeholder=\"类型\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动描述</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <textarea class=\"form-control\" rows=\"3\" placeholder=\"活动描述\"></textarea>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">座位安排状态</label>\n" +
            "                                        <div class=\"col-md-3 downEffect\">\n" +
            "                                            <label><span class=\"label label-warning \">已安排</span></label>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"col-md-1\">\n" +

            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">票价制定状态</label>\n" +
            "                                        <div class=\"col-md-3 downEffect priceTagArea\">\n" +

            "                                        </div>\n" +
            "                                        <div class=\"col-md-1\">\n" +

            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-md-1 text-center\">\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"row blockBorder disappear\">\n" +
            "                    <div class=\"col-md-4 col-md-offset-4 text-center\">\n" +
            "                        <h3 class=\"text-muted\">价格制定</h3>\n" +
            "                        <div class=\"hr\"></div>\n" +
            "                        <form class=\"form-horizontal\">\n" +
            "\n" +
            "                        </form>\n" +
            "                        <div class=\"hr\"></div>\n" +
            "                        <button type=\"button\" class=\"btn btn-primary priceSubmitButton\">完成</button>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";
        var priceTagOne = "<label><span class='label label-primary'>";
        var priceTagTwo = "</span></label>";
        /**
         * 怎么实现自动添加上节点然后附上值
         * 先将节点添加上去，然后再对每个对话框赋值、以及设定对应按钮的属性--
         * 设置座位按钮---查看座位
         * 设置票价按钮---查看票价
         */
        function appendPlanBlock(pname, purl, pdate, ptype, pdes, pricesConfig) {
            var cur_ele = $(planInitBlock).insertBefore($("#addButton").parent().parent());
            var img = cur_ele.find("img");
            var inputsField = cur_ele.find("input");
            var textareaField = cur_ele.find("textarea");
            img.eq(0).attr("src", purl);
            inputsField.eq(0).val(pname);
            inputsField.eq(1).val(purl);
            inputsField.eq(2).val(pdate);
            inputsField.eq(3).val(ptype);
            textareaField.eq(0).val(pdes);

            //添加座位展示信息和票价展示信息
            //pricesConfig[]包含的元素格式为a区180元，b区300元。。。。。

            var pricesTagArea = cur_ele.find(".priceTagArea").eq(0);
            for(var i = 0;i < pricesConfig.length;i++){
                pricesTagArea.append(priceTagOne + pricesConfig[i] + priceTagTwo);
            }
        }
        //最后要提交的座位信息
        var seatsSettingResult = [];
        //存储所有对应区的价格
        var resultMap = [];
        //最后带价格的作为信息的集合，"0-0-0-190"，"0-0-1-190"。。。。。
        var finalPriceInfoSet = [];

        //这是修改场馆信息的按钮，不是发布计划的按钮
        $(".editButton").click(function () {
            var buttonType = $(this).text();
            if(buttonType === "修改信息"){
                $(this).parent().prev().find("input").attr("disabled", false);
                $(this).text("保存");
            }else{
            //    因为修改了信息，所以要再次审核
                var inputsSet = $(this).parent().prev().find("input");
                var changedObject = {};
                changedObject.username = username;
                changedObject.name = inputsSet.eq(0).val();
                changedObject.location = inputsSet.eq(1).val();
                $.ajax({
                    type: 'post',
                    url: getContextPath() + "/scenter/changeStadiumInfo",
                    data: changedObject,
                    success: function () {
                        inputsSet.attr("disabled", true);
                        $(this).text("修改信息");
                        $("#statusLabel").removeClass("label-success").addClass("label-warning").text("Waited");
                    }
                })
            }
        });

        var stadiumStatusLabel;
        // if(seatsType === "a"){
        //
        // }else{
        //
        // }
        $("#aSubmitButton").click(function () {
            stadiumStatusLabel = $("#aPlan").prev().prev().children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().eq(1).find("span").eq(0);
            seatsSettingResult = planSeatsSubmit("a");
            $("#aPlan").addClass("disappear");
            stadiumStatusLabel.removeClass("label-warning");
            stadiumStatusLabel.addClass("label-success");
            stadiumStatusLabel.text("已设置");
            console.log(stadiumStatusLabel);
//            console.log(result);
        });
        $("#bSubmitButton").click(function () {
            stadiumStatusLabel = $("#bPlan").prev().prev().children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(5).children().eq(1).find("span").eq(0);
            seatsSettingResult = planSeatsSubmit("b");
            $("#bPlan").addClass("disappear");
            stadiumStatusLabel.removeClass("label-warning");
            stadiumStatusLabel.addClass("label-success");
            stadiumStatusLabel.text("已设置");
        });


        var aSelectedBlock = [];
        var bSelectedBlock = [];
        var aPriceAreaLabel = ["a","b","c","d","e","f","g","h","i"];
        var bPriceAreaLabel = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
        // var type = "a";//or "b"


        /**
         * 设置增加活动按钮事件disabled=""
         **/
        var planBlock = "<div class=\"row blockBorder\">\n" +
            "                <div class=\"row\">\n" +
            "                    <div class=\"col-md-2\">\n" +
            "<div class=\"text-center\">\n" +
            "                            <img width=\"200px\" style=\"margin-left: 20px\" src=\"\"/>\n" +
            "                        </div>"+
            "                        <h3 class=\"disappear\" style=\"\n" +
            "                                       margin: 20px 0 0 50px;\n" +
            "                           \"><span class=\"label label-success\">已发布</span></h3>" +
            "                    </div>\n" +
            "                    <div class=\"col-md-8\">\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-md-11\">\n" +
            "                                <form class=\"form-horizontal\">\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动名称</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"活动名称\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动海报</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control urlField\" placeholder=\"活动海报url\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>"+
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动时间</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"datetime-local\" class=\"form-control\" placeholder=\"活动时间\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动类型</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <input type=\"text\" class=\"form-control\" placeholder=\"类型\"/>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">活动描述</label>\n" +
            "                                        <div class=\"col-md-10\">\n" +
            "                                            <textarea class=\"form-control\" rows=\"3\" placeholder=\"活动描述\"></textarea>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">座位安排状态</label>\n" +
            "                                        <div class=\"col-md-3 downEffect\">\n" +
            "                                            <label><span class=\"label label-warning \">未安排</span></label>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"col-md-1\">\n" +
            "                                            <button type=\"button\" class=\"btn btn-default btn-sm setSeatsBtn\">设置</button>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"form-group\">\n" +
            "                                        <label class=\"col-md-2 control-label\">票价制定状态</label>\n" +
            "                                        <div class=\"col-md-3 downEffect\">\n" +
            "                                            <label><span class=\"label label-warning \">未制定</span></label>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"col-md-1\">\n" +
            "                                            <button type=\"button\" class=\"btn btn-default btn-sm setPriceBtn\">设置</button>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-md-1 text-center\">\n" +
            "                                <button type=\"button\" class=\"btn btn-primary assitButton\" disabled=\"\">发布计划</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"row blockBorder disappear\">\n" +
            "                    <div class=\"col-md-4 col-md-offset-4 text-center\">\n" +
            "                        <h3 class=\"text-muted\">价格制定</h3>\n" +
            "                        <div class=\"hr\"></div>\n" +
            "                        <form class=\"form-horizontal\">\n" +
            "\n" +
            "                        </form>\n" +
            "                        <div class=\"hr\"></div>\n" +
            "                        <button type=\"button\" class=\"btn btn-primary priceSubmitButton\">完成</button>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";

        $("#addButton").click(function () {
            //先去判断场馆审核状态，如果为"待审核"，则不能发布活动，弹出警告框
            //状态应该从后端拿，不应该直接判断前端标签内容
            // var status = $("#statusLabel").text();
            if(check_status === "Waited"){
                console.log("status: " + check_status);
                showTopAlert("场馆待管理员审核通过之后才能发布活动，我们会尽快为您处理！");
            }else{
                console.log("status: else" + status);
                $(planBlock).insertBefore($(this).parent().parent());

                $('.urlField').bind('input propertychange', function() {
                    $(this).parent().parent().parent().parent().parent().parent().prev().children().eq(0).children().eq(0).attr('src',$(this).val());
                });
                //将座位显示区展示出来
                $(".setSeatsBtn").click(function () {
                    var appendNode;
                    if(seatsType === "a"){
                        appendNode = $("#aPlan");
                    }else{
                        appendNode = $("#bPlan");
                    }
                    appendNode.removeClass("disappear");
                    $(this).parent().parent().parent().parent().parent().parent().parent().parent().append(appendNode);


                });


                var priceBlock = "<div class=\"form-group\">\n" +
                    "                    <label class=\"col-md-2 control-label area_num\"></label>\n" +
                    "                    <div class=\"col-md-10\">\n" +
                    "                        <div class=\"input-group\">\n" +
                    "                            <span class=\"input-group-addon\">￥</span>\n" +
                    "                            <input type=\"number\" class=\"form-control\" aria-label=\"Amount (to the nearest dollar)\"/>\n" +
                    "                            <span class=\"input-group-addon\">元</span>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>";
                $(".setPriceBtn").click(function () {
                    var thisButton = $(this);
                    var state = thisButton.parent().parent().prev().children().eq(1).children().eq(0).children().text();
                    if(state === "未安排"){
                        showTopAlert("请先安排座位，再进行设置价格！")
                    }else{
                        //遍历数据
                        var cur_ele;
                        var cur_ele_data;
                        var blockNum = 0;
                        var rowNum = 0;
                        var colNum = 0;
                        var value = 0;
                        for(var i = 0;i < seatsSettingResult.length;i++){
                            cur_ele_data = seatsSettingResult[i];
                            blockNum = cur_ele_data.substr(0,1);
                            rowNum = cur_ele_data.substr(2,1);
                            colNum = cur_ele_data.substr(4,1);
                            value = cur_ele_data.substr(6,1);
                            if(value === "1"){
                                markBlock(blockNum);
                            }
                        }
                        function markBlock(blockNum) {
                            if(seatsType === "a"){
                                if(aSelectedBlock.indexOf(blockNum) === -1){
                                    aSelectedBlock.push(blockNum);
                                }
                            }else{
                                if(bSelectedBlock.indexOf(blockNum) === -1){
                                    bSelectedBlock.push(blockNum);
                                }
                            }

                        }
                        var selectedBlock;
                        var priceAreaLabelSet;
                        if(seatsType === "a"){
                            selectedBlock = aSelectedBlock;
                            priceAreaLabelSet = aPriceAreaLabel;
                        }else{
                            selectedBlock = bSelectedBlock;
                            priceAreaLabelSet = bPriceAreaLabel;
                        }
                        //整个大块，有disappear类的块
                        var bigBlock = thisButton.parent().parent().parent().parent().parent().parent().parent().next();
                        var appendArea;
                        for(var i = 0;i < selectedBlock.length;i++){
                            appendArea = bigBlock.children().eq(0).children().eq(2);
                            appendArea.append(priceBlock);
                            appendArea.children().eq(-1).children().eq(0).text("" + priceAreaLabelSet[selectedBlock[i]] + " 区");
                        }
                        bigBlock.removeClass("disappear");
                        thisButton.prop("disabled", true);

                        //为"完成"按钮设置事件
                        $(".priceSubmitButton").click(function () {
                            var priceItemsSet = $(this).prev().prev().children();
                            for(var m = 0;m < priceItemsSet.length;m++){
                                var cur_item = priceItemsSet.eq(m);
                                var itemNum = cur_item.children().eq(0).text().substr(0,1);
                                var itemPrice = cur_item.children().eq(1).children().eq(0).children().eq(1).val();
                                resultMap[m] = "" + itemNum + "-" + itemPrice;
                            }
//                            console.log(resultMap);
                            //非常重要的部分：将价格标注在每个座位上
                            var aPlan = $("#aPlan");
                            var bPlan = $("#bPlan");
                            var a_area_set = aPlan.find(".seatsBlock").eq(0).find(".areaBlock");
                            var b_area_set = bPlan.find(".seatsBlock").eq(0).find(".areaBlock");
                            var cur_area = [];
                            var cur_ckb;
                            //用来暂时存放价格信息的变量，为什么？要把这个价格加进finalPriceInfoSet数组，也要设置到checkbox上，为什么，不用
                            // var price;
                            for(var k = 0;k < aSelectedBlock.length;k++){
                                 console.log("a :" + k + aSelectedBlock[k]);
                                 cur_area = a_area_set.eq(k).find("input[type='checkbox']");
                                 for(var kk = 0;kk < cur_area.length;kk++){
                                     cur_ckb = cur_area.eq(kk);
                                     //只有被勾选，并且显示出来的，才能被添加进结果待售数组----0表示还未售出，所以要显示，-1表示已售出，所以在前端界面不显示
                                     if(cur_ckb.prop("checked")){
                                         if(!cur_ckb.prop("disabled")){
                                             finalPriceInfoSet.push((cur_area.eq(kk).val() + "-0" + "-" + resultMap[k].split("-")[1]));
                                         }else{
                                             finalPriceInfoSet.push((cur_area.eq(kk).val() + "-1" + "-" + resultMap[k].split("-")[1]));
                                         }
                                     }
                                     // else{
                                     //     finalResult[finalResultIndex] = cur_ckb.val() + "-0";
                                     //     finalResultIndex++;
                                     // }
                                     //不仅要把价格放上去，还要把是否卖出也放上去，即使都是0----------"-0"

                                     // cur_area.eq(kk).val();
                                 }
                            }
                            for(var k = 0;k < bSelectedBlock.length;k++){
                                console.log("b :" + k + bSelectedBlock[k]);
                                cur_area = b_area_set.eq(k).find("input[type='checkbox']");
                                for(var kk = 0;kk < cur_area.length;kk++){
                                    finalPriceInfoSet.push((cur_area.eq(kk).val() + "-0" + "-" + resultMap[k].split("-")[1]));
                                    // cur_area.eq(kk).val((cur_area.eq(kk).val() + "-" + resultMap[k].split("-")[1]));
                                }
                            }





                            //将价格模块收起
                            bigBlock.addClass("disappear");
                            //找到价格设置状态标签，设置其为已设置---是否要有待审核？
                            // var newStatusLabel = "<label><span class=\"label label-warning \">待审核</span></label>";
                            var priceStatusLabel = $(this).parent().parent().prev().children().eq(1).children().eq(0).children().eq(0).children().eq(0).children().eq(6).find("span").eq(0);
                            priceStatusLabel.removeClass("label-warning");
                            priceStatusLabel.addClass("label-success");
                            priceStatusLabel.text("已设置");
                            // priceStatusLabel.parent().parent().append(newStatusLabel);
                            thisButton.prop("disabled", false);

                            //设置完价格后，点击完成，找到assitButton，将其设置为可点击
                            thisButton.parent().parent().parent().parent().next().children().eq(0).attr("disabled", false);
                        });

                        //发布计划按钮
                        $(".assitButton").click(function () {
                            var inputsSet = $(this).parent().prev().find("input");//保存了所有input，以方便提取输入的信息
                            var textareasSet = $(this).parent().prev().find("textarea");
                            var planName = inputsSet.eq(0).val();
                            var planPosterUrl = inputsSet.eq(1).val()
                            var planDate = inputsSet.eq(2).val();
                            var planType = inputsSet.eq(3).val();
                            var planDescription = textareasSet.eq(0).val();
                            console.log(planName + ";" + planDate + ";" + planType + ";" + planDescription);
                            console.log("seatsSettingResult: " + seatsSettingResult);
                            console.log("resultMap: " + resultMap);
                            console.log("finalPriceInfoSet: " + finalPriceInfoSet);

                            //将所有获取到的东西传到后端
                            var json = {};
                            json.susername = username;
                            json.planName = planName;
                            json.planPosterUrl = planPosterUrl;
                            json.planDate = planDate;
                            json.planType = planType;
                            json.planDescription = planDescription;
                            json.finalPriceInfoSet = finalPriceInfoSet;
                            $.ajax({
                                type: 'post',
                                url: getContextPath() + "/scenter/submitPlan",
                                data: json,
                                success: function () {
                                    thisButton.parent().parent().parent().parent().parent().parent().parent().children().eq(0).children().eq(1).removeClass("disappear");
                                }
                            });
                            //这个东西怎么存-plan是一张表，字段：susername，pid，pname，pdate，ptype，pdescription
                            //座位另外一张表PlanSeat--这张表才是真正到时候要展示给用户的座位图，字段：三维坐标（主键）、是否勾选value，是否已售selt、价格
                            //问题：怎样将价格与座位匹配起来
                            // var type = $(this).text();
                            // if(type === "修改信息"){
                            //     $(this).parent().prev().find("input").attr("disabled", false);
                            //     $(this).parent().prev().find("textarea").attr("disabled", false);
                            //     $(this).text("保存");
                            // }else{
                            //     $(this).parent().prev().find("input").attr("disabled", true);
                            //     $(this).parent().prev().find("textarea").attr("disabled", true);
                            //     $(this).text("修改信息");
                            // }
                        });
                    }
                });
            }
        });
    }


    $("#checkTicketButton").click(function () {
        var ticketId = $("#checkTicketField").val();
        var json = {};
        json.ticketId = ticketId;
        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticket/checkTicket",
            data: json,
            success: function (data) {
                if(data){
                    $("#checkTicketField").val("");
                    alert("检票成功！");
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    })

    var myChart = echarts.init(document.getElementById('pieChart'));
    // 初始 option
    //图表显示提示信息
    myChart.showLoading();
    //定义图表options
    var options = {
        title : {
            text : '场馆计划计划类型分布图',
            subtext : '',
            x : 'center'
        },
        tooltip : {
            trigger : 'item',
            formatter : "{a} <br/>{b} : {c} ({d}%)"
        },
        legend : {
            orient : 'vertical',
            left : 'left',
            data : []
        },
        series : [ {
            name : '访问来源',
            type : 'pie',
            data : []
        } ]
    };
    //通过Ajax获取饼状图数据
    var json = {};
    json.stadiumName = username;
    $.ajax({
        type : "post",
        async : false, //同步执行
        url : getContextPath() + "/scenter/getPlanTypeData",
        data: json,
        dataType : "json", //返回数据形式为json
        success : function(result) {
            if (result) {
                options.legend.data = result.legend;
                //将返回的category和series对象赋值给options对象内的category和series
                //因为xAxis是一个数组 这里需要是xAxis[i]的形式
                options.series[0].name = result.series[0].name;
                options.series[0].type = result.series[0].type;
                var serisdata = result.series[0].data;

                //遍历
                /* var datas = [];
                for ( var i = 0; i < serisdata.length; i++) {
                    datas.push({
                        name : serisdata[i].name,
                        value : serisdata[i].value
                    });
                }
                options.series[0].data = datas; */

                //jquery遍历
                var value = [];
                $.each(serisdata, function(i, p) {
                    value[i] = {
                        'name' : p['name'],
                        'value' : p['value']
                    };
                });
                options.series[0]['data'] = value;

                myChart.hideLoading();
                myChart.setOption(options);
            }
        },
        error : function(errorMsg) {
            alert("图表请求数据失败啦!");
        }
    });


    //通过Ajax获取柱状图数据
    var myChart = echarts.init(document.getElementById('barChart'));
    //图表显示提示信息
    myChart.showLoading();
    //定义图表options
    var options = {
        color : [ '#3398DB' ],
        title : {
            text : "收入订单金额统计统计",
            subtext : "www.stepday.com",
            sublink : ""
        },
        tooltip : {
            trigger : 'axis'
        },
        legend : {
            data : []
        },
        toolbox : {
            show : true,
            feature : {
                mark : false
            }
        },
        calculable : true,
        xAxis : [ {
            type : 'category',
            data : []
        } ],
        yAxis : [ {
            type : 'value',
            splitArea : {
                show : true
            }
        } ],
        series : [ {
            barWidth : '60%'
        } ]
    };


    $.ajax({
        type : "post",
        async : false, //同步执行
        url : getContextPath() + "/scenter/getRevenueBarData",
        dataType : "json", //返回数据形式为json
        data: json,
    success : function(result) {
        if (result) {
            //将返回的category和series对象赋值给options对象内的category和series
            //因为xAxis是一个数组 这里需要是xAxis[i]的形式
            options.xAxis[0].data = result.category;
            options.series = result.series;
            options.legend.data = result.legend;

            myChart.hideLoading();
            myChart.setOption(options);
        }
    },
    error : function(errorMsg) {
        alert("图表请求数据失败啦!");
    }
});
    // series : [
    //     {
    //         name: '访问来源',
    //         type: 'pie',
    //         radius: '55%',
    //         data:[
    //             {value:235, name:'视频广告'},
    //             {value:274, name:'联盟广告'},
    //             {value:310, name:'邮件营销'},
    //             {value:335, name:'直接访问'},
    //             {value:400, name:'搜索引擎'}
    //         ]
    //     }
    // ]
});



