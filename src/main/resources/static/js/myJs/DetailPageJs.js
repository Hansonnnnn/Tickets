var order = {};
var orderId;
var planId;
$(function () {
    if($("#loginButton").attr("alt") !== ""){
        addPayButtonEvents();
    }
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    planId = window.location.search.split("=")[1];//获取到planId
    var seatsType;//保存座位类型：a or b
    var seatsConfig = [];
    //拿到seat的座位数据以及座位类型，你要做什么？绘制座位--什么时候绘制？拿到数据就绘制---绘制之后怎么显示？点击"立即选座"之后显示
    var json = {};
    json.planId  = planId;
    $.ajax({
        type: 'post',
        url: getContextPath() + "/planDetails/getSeatsData",
        data: json,
        success: function (data) {
            console.log("请求成功！");
            seatsType = data.seatsType;
            seatsConfig = data.seatsConfig;
            drawSeats(seatsType, seatsConfig);
        },
        error: function (error) {
            console.log(error);
        }
    });

    var time = $("#timeField").text();
    var priceItems = $("#priceBlock").find("input");
    /**
     * 判断是否还有价格复选框被选中
     **/
    function checkIfSelected() {
        for (var i = 0;i < priceItems.length;i++){
            if(priceItems.eq(i).is(":checked")){
                return true;
            }

        }
    }

    //不选座立即购买选择的票价
    // var selectedPrice = [];
    //对应票价票的数量，这个数组和上面数组是一样长的
    // var ticketsNum = [];
    for (var i = 0;i < priceItems.length;i++){
        priceItems.eq(i).click(function () {
            if($(this).is(":checked")){
                $("#chooseSeatsButton").attr("disabled", true);
                //这里的一个非常重要的问题：id中不能存在"."，不能存在，html元素id的命名规则可以有.，但是jquery选择器中不能用
                var ids = this.value.split(".");
                // selectedPrice.push(this.value);
                addSelectedItem('"' + time + '"   "' + this.value + '"', ids[0]);
                $("#noSelectedSeatsPayButton").removeClass("disappear");
            }else{
                var ids = this.value.split(".");
                if(!checkIfSelected()){
                    $("#chooseSeatsButton").attr("disabled", false);
                    $("#noSelectedSeatsPayButton").addClass("disappear");
                }
                // selectedPrice.remove(this.value);
                deSelectItem(ids[0]);

            }

        })
    }


    var blockHTML = "<div class=\"row downEffect\">\n" +
        "                        <div class=\"col-md-12\">\n" +
        "                            <div class=\"input-group\">\n" +
        "                                <input type=\"text\" class=\"form-control selectedItemInput\" aria-label=\"...\" value=\"\" disabled id=\"\">\n" +
        "                                <div class=\"input-group-btn\">\n" +
        "                                    <button type=\"button\" class=\"btn btn-default btn-add\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
        "                                    <button type=\"button\" class=\"btn btn-default btn-show\" style=\"width: 50px;\">1</button>\n" +
        "                                    <button type=\"button\" class=\"btn btn-default btn-minus\"><span class=\"glyphicon glyphicon-minus\"></span></button>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>";
    function addSelectedItem(price, id) {
        var selectedBlock = $("#selectedBlock");
        selectedBlock.append(blockHTML);
        //设置输入框里面的值为对应的价格
        var input = selectedBlock.find(".selectedItemInput").last();
        input.val(price);
        //设置对应的id，使checkbox和这个输入框绑定在一起
        input.parent().parent().parent().attr("id", id);
        addButtonEventListeners(id);
    }


    /**
     * 这里存在硬编码的问题：checkbox前面有c_
     * 这里要删掉的节点不是checkbox，而是价格加减项
     **/
    function deSelectItem(id) {
        $("#" + id).remove();
    }


    /**
     * 为+、-按钮增加响应事件，改变对应票的数量
     */
    function addButtonEventListeners(id) {
        var selectedBlock = $("#selectedBlock");
        var value = 0;
        var showButton;
        var returnResult = 0;
        selectedBlock.find(".btn-add").last().click(function (event) {
            var tagName = $(event.target).prop("tagName");
            var biggerWarnings = "提示：每单限购20张，请您重新选择!";
            if(tagName === "SPAN"){
                showButton = $(event.target).parent().next();
            }else if(tagName === "BUTTON"){
                showButton = $(event.target).next();
            }
            value = showButton.text() * 1;
            returnResult = isOutOfBounds();
            if(returnResult === 1){
                showWarningAlert(biggerWarnings);
            }else{
                showButton.text(++value);
            }
        });
        selectedBlock.find(".btn-minus").last().click(function (event) {
            var tagName = $(event.target).prop("tagName");
            if(tagName === "SPAN"){
                showButton = $(event.target).parent().prev();
            }else if(tagName === "BUTTON"){
                showButton = $(event.target).prev();
            }
            value = showButton.text() * 1;
            if (value === 1){
                //让这一行DOM节点消失
                $("#c_" + id).prop("checked", false);
                $(this).parent().parent().parent().parent().remove();
            }else{
                showButton.text(--value);
                closeWaringAlert();
            }
        })
    }

    /**
     * 该方法只有一个功能：判断总数是否超过20张
     * 返回值1、0、-1：---错错错错
     * 1表示总数超过20，0表示在正常区间（1-20），-1表示0和负数 -----bug:-1代表负数，但负数就不应该是总数来判断，而应该是单个判断
     * 返回值1
     * @returns {number}
     */
    function isOutOfBounds() {
        var selectedBlock = $("#selectedBlock");
        var showButtons = selectedBlock.find(".btn-show");
        var totalNum = 0;
        for(var i = 0;i < showButtons.length;i++){
            totalNum += showButtons.eq(i).text() * 1;
        }
        if (totalNum >= 20){
            return 1;
        }
    }

    $("#chooseSeatsButton").click(function () {
        if(seatsType === "a"){
            $("#aPlanModal").modal('show');
        }else{
            $("#bPlanModal").modal('show');
        }
    });

    //这里不应该使用以下两个方法，因为没有根据后端的数据来设置座位的数据


    // setAValues();
    // setBValues();

    var selectedSeats = [];
    var selectedSeatsNodeSet = [];

    //订单记录的信息：订单编号、时间、场馆名称、地点、票价、座位、总价格、

    $(".chooseFinishedButton").click(function () {
        $(this).parent().parent().parent().parent().modal('hide');
        //弹出支付modal,弹出之前先将数据装载好
        order.sname = $("#snameField").text();
        order.location = $("#locationField").text();
        order.planId = planId;
        order.planName = $("#planNameField").text();
        order.planDate = $("#timeField").text();
        order.seatsAndPrices = selectedSeats.join(";");
        console.log("selectedSeats: " + selectedSeats.join(";"));
        //总价格
        var totalPrice = computeTotalPrice(selectedSeats);
        order.totalPrice = totalPrice;
        order.status = 0;
        //优惠券
        order.couponId = getHighestCoupon(totalPrice);
        order.userId = $("#loginButton").attr("alt");
        order.type = 1;
        $("#payModal").modal('show');
        // //把全部拿到的信息向后端发送
        // $.ajax({
        //     type: 'post',
        //     url: getContextPath() + "/ticket/createOrder",
        //     data: order,
        //     success: function (data) {
        //         orderId = data;
        //
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });
    });

    //该事件为modal显示出来之后触发，所以大致逻辑为：显示模态框、向厚端发起请求、后端创建订单、订单计时、
    $('#payModal').on('shown.bs.modal', function (e) {
        order.validationTime = new Date().getTime();
        //每1000ms，就是每一秒去调用一次函数
        var timer = setInterval(showLeftTime, 1000);
        var minute = 14;
        var second = 59;
        function showLeftTime() {
            if(second >= 0 && second <= 9){
                $("#leftTimeField").text("" + minute + ":0" + second);
            }else{
                $("#leftTimeField").text("" + minute + ":" + second);
            }
            second--;
            if(minute === 0 && second === 0){
                clearInterval(timer);
            //    向后端发起请求，将该订单置为无效

                cancelOrder(orderId);
                $("#payModal").modal('hide');
            }else if(second === 0){
                minute--;
                second = 59;
            }
        }

        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticket/createOrder",
            data: order,
            success: function (data) {
                orderId = data;
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
    function drawSeats(type, seatsConfig) {
        //取到结构框架的元素
        //a方案
        var aPlan = $("#aPlan");
        //area set
        var a_area_set = aPlan.find(".seatsBlock").eq(0).find(".areaBlock");
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
        //area set
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
        var selt = "";
        var price = "";

        //先将所有的座位设置为disabled
        aPlan.find("input[type='checkbox']").attr("disabled", true);
        bPlan.find("input[type='checkbox']").attr("disabled", true);
        //这里的0为"未售出"，1为已售出
        if(type === "a"){
            for(var i = 0;i < seatsConfig.length;i++){
                cur_ele_data = seatsConfig[i].split("-");
                blockNum = cur_ele_data[0];
                rowNum = cur_ele_data[1];
                colNum = cur_ele_data[2];
                selt = cur_ele_data[3];
                price = cur_ele_data[4];
                cur_ele = a_area_ele_set[blockNum][rowNum][colNum];
                cur_ele.val(seatsConfig[i]);
                if(selt === "0"){
                    // cur_ele.css("visibility", "hidden");
                    cur_ele.attr("disabled", false);
                }
            }
        }else{
            for(var i = 0;i < seatsConfig.length;i++){
                cur_ele_data = seatsConfig[i].split("-");
                blockNum = cur_ele_data[0];
                rowNum = cur_ele_data[1];
                colNum = cur_ele_data[2];
                selt = cur_ele_data[3];
                price = cur_ele_data[4];
                cur_ele = b_area_ele_set[blockNum][rowNum][colNum];
                cur_ele.val(seatsConfig[i]);
                if(selt === "0"){
                    // cur_ele.css("visibility", "hidden");
                    cur_ele.attr("disabled", false);
                }
            }
        }

        function addCheckboxEventListeners() {
            //这两个变量改为全局变量
            // var selectedSeats = [];
            // var selectedSeatsNodeSet = [];
            var appendArea;
            var appendedNodeOne = "<span class=\"label label-danger \">";
            var appendedNodeTwo = "</span>";
            var wholeAppendedNode;
            aPlan.find("input[type='checkbox']").click(function () {
                //这个地方有bug，只能按顺序点---然后按顺序取消
                //传数据的时候，传回去num的数组，在后端组合成---num + "-1"，然后前端再次取回来的时候，判断是否为1
                appendArea = aPlan.find(".selectedSeats").eq(0);
                var num = $(this).val();
                var realContent = (parseInt(num.substr(0,1)) + 1) + "区" + (parseInt(num.substr(2,1)) + 1) + "排" + (parseInt(num.substr(4,1)) + 1) + "号";
                if($(this).prop("checked")){
                    if(selectedSeats.length <= 5){
                        selectedSeats.push(num);
                        wholeAppendedNode = appendedNodeOne + realContent + appendedNodeTwo;
                        appendArea.append(wholeAppendedNode);
                        selectedSeatsNodeSet.push(appendArea.children().eq(-1));
                    }else{
                        alert("抱歉！选座购买最多购买6张票，谢谢！");
                        $(this).prop("checked", false);
                    }
//                console.log("selectedSeats" + selectedSeats);
//                console.log("selectedSeatsNodeSet" + selectedSeatsNodeSet);
                }else{
                    var index = selectedSeats.indexOf(num);
                    selectedSeats.remove(num);
//                console.log("index" + index);
//                console.log("selectedSeats" + selectedSeats);
//                console.log("selectedSeatsNodeSet" + selectedSeatsNodeSet);
                    selectedSeatsNodeSet[index].remove();
                }
            });
            bPlan.find("input[type='checkbox']").click(function () {
                //这个地方有bug，只能按顺序点---然后按顺序取消
                //传数据的时候，传回去num的数组，在后端组合成---num + "-1"，然后前端再次取回来的时候，判断是否为1
                appendArea = bPlan.find(".selectedSeats").eq(0);
                var num = $(this).val();
                var realContent = (parseInt(num.substr(0,1)) + 1) + "区" + (parseInt(num.substr(2,1)) + 1) + "排" + (parseInt(num.substr(4,1)) + 1) + "号";
                if($(this).prop("checked")){
                    if(selectedSeats.length <= 5){
                        selectedSeats.push(num);
                        wholeAppendedNode = appendedNodeOne + realContent + appendedNodeTwo;
                        appendArea.append(wholeAppendedNode);
                        selectedSeatsNodeSet.push(appendArea.children().eq(-1));
                    }else{
                        alert("抱歉！选座购买最多购买6张票，谢谢！");
                        $(this).prop("checked", false);
                    }

//                console.log("selectedSeats" + selectedSeats);
//                console.log("selectedSeatsNodeSet" + selectedSeatsNodeSet);
                }else{
                    var index = selectedSeats.indexOf(num);
                    selectedSeats.remove(num);
//                console.log("index" + index);
//                console.log("selectedSeats" + selectedSeats);
//                console.log("selectedSeatsNodeSet" + selectedSeatsNodeSet);
                    selectedSeatsNodeSet[index].remove();
                }
            });
        }
        addCheckboxEventListeners();
    }

    $("#payNowButton").click(function () {
        console.log("payNowButton click");
        var json = {};
        json.username = $("#payUsernameField").val();
        json.password = $("#payPasswordField").val();
        json.orderId = orderId;
        json.email = $("#loginButton").attr("alt");
        console.log("payNowButton click json:" + json);
        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticket/payOrder",
            data: json,
            success: function (data) {
                if(data){
                    $("#payModal").modal('hide');
                    window.location.reload(true);
                }else{
                    alert("密码错误或余额不足！");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });

    $("#cancelButton").click(function () {
        cancelOrder(orderId);
    });
    
    
//    监听loginButton的alt属性的变化
//     $("#loginButton").attr("alt").on("change",function () {
//         console.log($(this).attr() + "*****************");
//     })
//    之所以加这段代码是因为，在LoginModal.js中会调用addPayButtonEvents()但是这种调用关系不合理，但又想模拟这一过程，
//    所以将调用改为监听
    watchAttrChange();
});



var couponUpperLimit;
var couponDiscount;
function addPayButtonEvents() {

    /**
     * 不选座直接购买按钮点击事件
     */
    //不选座，票价和对应的票的数量，用"-"连接
    console.log("addPayButtonEvents");
    var selectedPriceAndNum = [];

    $("#noSelectedSeatsPayButton").find("button").click(function () {
        var blockSets = $("#selectedBlock").find(".downEffect");
        for(var i = 0;i < blockSets.length;i++){
            //两步思路：第一步：拿到id，即价格；第二步：拿到对应的数量；第三步：计算出总价格
            var curEle = blockSets.eq(i);
            selectedPriceAndNum.push(curEle.attr("id") + "-" + curEle.find(".btn-show").eq(0).text());
        }
        var totalPrice = 0;
        for(var j = 0;j < selectedPriceAndNum.length;j++){
            var price = selectedPriceAndNum[j].split("-")[0];
            var num = selectedPriceAndNum[j].split("-")[1];
            totalPrice += parseInt(price) * parseInt(num);
        }

        var payModal = $("#payModal");
        payModal.find("#totalPayNum").text(totalPrice + "元");


        //弹出支付modal,弹出之前先将数据装载好
        order.sname = $("#snameField").text();
        order.location = $("#locationField").text();
        order.planId = planId;
        order.planName = $("#planNameField").text();
        order.planDate = $("#timeField").text();
        order.seatsAndPrices = selectedPriceAndNum.join(";");
        console.log("seatsAndPrices: " + selectedPriceAndNum.join(";"));
        //总价格
        order.totalPrice = totalPrice;
        order.status = 0;
        //优惠券
        order.couponId = getHighestCoupon(totalPrice);
        order.userId = $("#loginButton").attr("alt");
        order.type = 0;
        console.log(order);

        payModal.modal('show');
        // $.ajax({
        //     type: 'post',
        //     url: getContextPath() + "/ticket/createOrder",
        //     data: order,
        //     success: function (data) {
        //         //后端返回生成订单对应的id，要把这个id暂存到某个位置----------下面只要一出发modal的show事件，上面的监听事件的方法就会被执行
        //         //只要一打开支付模态框，优惠券就已经用了
        //         order.orderId = data;
        //         payModal.modal('show');
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });

    });
}
function computeTotalPrice(prices) {
    var totalPrice = 0;
    for(var i = 0;i < prices.length;i++){
        totalPrice += parseInt(prices[i].split("-")[4]);
    }
    return totalPrice;
}
function getHighestCoupon(limit) {
    var couponId = 0;
    //这里要去获得用户的优惠券
    //1.首先拿到用户名
    var email = $("#loginButton").attr("alt");
    var json = {};
    json.userEmail = email;
    json.upperLimit = limit;
    console.log("userEmail: " + email);
    $.ajax({
        type: 'post',
        url: getContextPath() + "/coupon/getHighestCoupon",
        data: json,
        success: function (data) {
            console.log(data);
            //    这里拿回来的只有最高减免优惠的优惠券对象
            if(data.upperLimit === 0 || data.discount === 0){
                couponUpperLimit = 0;
                couponDiscount = 0;
                $("#realPayNum").text(parseInt(limit) - couponDiscount);
                $("#totalPayNum").text(limit);
                $("#couponBlock").text("满" + couponUpperLimit + "减" + couponDiscount);
                console.log("if true");
            }else{
                couponUpperLimit = data.upperLimit;
                couponDiscount = data.discount;
                couponId = data.id;
                //获得最高减免优惠券之后，要把支付模态框中需要设置的地方都设置了
                $("#realPayNum").text(parseInt(limit) - couponDiscount);
                $("#totalPayNum").text(limit);
                $("#couponBlock").text("满" + couponUpperLimit + "减" + couponDiscount);
                console.log("if false");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    return couponId;
}

function cancelOrder(orderId) {
    var json = {};
    json.orderId = orderId;
    $.ajax({
        type: 'post',
        url: getContextPath() + "/ticket/cancelOrder",
        data: json,
        success: function (data) {
            if(data){
                console.log("撤销订单成功");
                window.location.reload(true);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
