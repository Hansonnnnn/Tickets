var orderId;
$(function () {
    // $('#requestTab a').click(function (e) {
    //     e.preventDefault();
    //     $(this).tab('show')
    // });

    // var urlRoot = "http://localhost:3000";
    function logout(email) {
        $.ajax({
            url: getContextPath() + '/login/logout',
            type:'post',
            data: email,
            success: function (data) {
                if(data){
                    console.log("登出成功");
                    $("#loginButton").attr("alt", "");
                    window.location.href = getContextPath() + "/welcome";
                }
            },
            error: function (error) {
                console.log("登出失败");
                console.log(error);
            }
        })
    }

    function stopVIP(email) {
        $.ajax({
            url: getContextPath() + '/login/stopVIP',
            type:'post',
            data: email,
            success: function (data) {
                if(data){
                    console.log("注销会员资格成功");
                    $("#loginButton").attr("alt", "");
                    window.location.href = getContextPath() + "/welcome";
                }
            },
            error: function (error) {
                console.log("注销失败");
                console.log(error);
            }
        })
    }

    $("#logoutButton").click(function (e) {
        var email = {};
        email.email = $("#loginButton").attr("alt");
        console.log(email);
        logout(email);
    });

    $("#stopVIPButton").click(function () {
        var email = {};
        email.email = $("#loginButton").attr("alt");
        console.log(email);
        stopVIP(email);
    });

    $("#exchangeButton").click(function () {
        var num = $("#numInput option:selected").val();
        //减少积分
        var curValue = $(".integralLabel").eq(0).text();
        curValue = "" + (parseInt(curValue) - parseInt(num));
        console.log(curValue);
        $(".integralLabel").text(curValue);

        //添加优惠券
        var appendNodeOne = "<div class=\"row listBlock\">\n" +
            "                            <div class=\"col-md-12\">\n" +
            "                                <h5>满 <span class=\"text-danger\">";
        var appendnodeTwo = "</span> 减 <span class=\"text-danger\">";
        var appendNodeThree = "</span></h5>\n" +
            "                            </div>\n" +
            "                        </div>";
        var appendBlock = $("#couponsBlock").find(".innerBigBlock").eq(0);
        var discountSet = [20, 60, 130, 300];
        var discount = 0;
        if(num === "100"){
            discount = discountSet[0];
        }else if(num === "300"){
            discount = discountSet[1];
        }else if(num === "500"){
            discount = discountSet[2];
        }else if(num === "1000"){
            discount = discountSet[3];
        }
        var wholeNode = appendNodeOne + num + appendnodeTwo + discount + appendNodeThree;
        appendBlock.append(wholeNode);
        var json = {};
        json.email = $("#loginButton").attr("alt");
        json.integral = parseInt(num);
        //关闭模态框
        $.ajax({
            type: 'post',
            url: getContextPath() + "/coupon/createCoupon",
            data: json,
            success: function (data) {
                $('#conversionRulesModal').modal('hide');
            },
            error: function (error) {
                console.log(error);
            }
        });

    });

    $("#editPersonalInfoBtn").click(function () {
        var user = {};
        user.email = window.location.search.split("=")[1];
        user.username = $("#userNameField").val();
        user.password = $("#passwordField").val();
        $.ajax({
            type: 'post',
            url: getContextPath() + "/personalCenter/editPersonalInfo",
            data: user,
            success: function (data) {
                if(data){
                    alert("信息保存成功");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });

    // debookTicket
    $(".unsubscribeButton").click(function () {
    //    大致思路：先拿到id
        var json = {};
        var thisButton = $(this);
        json.ticketId = thisButton.parent().parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0).text();
        // var ticketId = thisButton.parent().parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0).text();
        // console.log("ticketId: " + ticketId);
        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticket/debookTicket",
            data: json,
            success: function (data) {
                console.log("退订成功!");
            //    将这个节点删除
            //     console.log(thisButton.parent().parent().parent().parent());
                thisButton.parent().parent().parent().parent().remove();
            },
            error: function (error) {
                console.log(error);
            }
        })
    });


    var timer;
    $(".pcPayButton").click(function () {
        clearInterval(timer);
        orderId = $(this).parent().parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0).text();
        console.log("orderId: " + orderId);
        var json = {};
        //设置对应的支付信息
        json.orderId = orderId;
        $("#totalPayNum").text($(this).parent().parent().parent().next().children().eq(1).children().eq(0).text());
        console.log("$(this).parent().parent().parent().next().children().eq(1).children().eq(0).text():" + $(this).parent().parent().parent().next().children().eq(1).children().eq(0).text());
        //思路是这样的现在已经有了orderId，所以到后端把优惠券、拿过来，再设置上去

        //    到期时间的问题，就是设置15分钟对应的毫秒数，去判断是否超过这个值
        //    去后端拿到还有多长时间过期的值

        var min = 0;
        var second = 59;
        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticket/getValidationTime",
            data: json,
            success: function (data) {
                min = parseInt(data);
                console.log(min--);
                timer = setInterval(showLeftTime, 1000);
                if(min === 0 || min < 0){
                    console.log("min: " + min);
                    alert("订单已失效！");
                    window.location.reload();
                }else{
                    $("#payModal").modal('show');
                    console.log("min: " + (min - 1));
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
        function showLeftTime() {
            if(second >= 0 && second <= 9){
                $("#leftTimeField").text("" + min + ":0" + second);
            }else{
                $("#leftTimeField").text("" + min + ":" + second);
            }
            second--;
            if(min === 0 && second === 0){
                clearInterval(timer);
                //    向后端发起请求，将该订单置为无效
                cancelOrder(orderId);
                $("#payModal").modal('hide');
            }else if(second === 0){
                min--;
                second = 59;
            }
        }


    });

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


});

