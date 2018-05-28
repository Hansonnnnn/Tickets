$(function () {
    //进入界面加载数据,是一次全部加载还是分次加载
    var stadiumList = [];
    $.ajax({
        type: 'post',
        url: getContextPath() + "/ticketsManager/data",
        success: function (data) {
            stadiumList = data.stadiumList;
            appendList();
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (error) {
            console.log(error);
        }
    });


//    对获取到的list数据做循环append节点
    function appendList() {
        console.log("sppendlist");
        console.log("size: " + stadiumList.length);
        var appendArea = $("#auditBlock");
        var appendNodeOne = "<div class=\"row blockBorder\">\n" +
            "                <div class=\"col-md-1 text-center\">\n" +
            "                    <h5>";
        //中间放场馆用户名
        var appendNodeTwo = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-2 text-center\">\n" +
            "                    <h5>";
        //中间放场馆名称
        var appendNodeThree = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-3 text-center\">\n" +
            "                    <h5>";
        //中间放场馆地址
        var appendNodeFour = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-2 text-center\">\n" +
            "                    <h5>";
        //中间放场馆申请时间
        var appendNodeFive = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-1 text-center\">\n" +
            "                    <h5>";
        //中间放座位类型
        var appendNodeSix = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-1 text-center\">\n" +
            "                    <h5>";
        //中间放审核状态
        var appendNodeLast = "</h5>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-1 text-center\">\n" +
            "                    <button type=\"button\" class=\"btn btn-default passBtn\">通过</button>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-1 text-center\">\n" +
            "                    <button type=\"button\" class=\"btn btn-danger refuseBtn\">拒绝</button>\n" +
            "                </div>";
        var appendWholeNode = "";
        var cur_ele;
        var date;
        for(var i = 0;i < stadiumList.length;i++){
            cur_ele = stadiumList[i];
            date = new Date(cur_ele.lastModifiedTime).toLocaleString();
            appendWholeNode = appendNodeOne + cur_ele.susername + appendNodeTwo + cur_ele.sname + appendNodeThree
             + cur_ele.slocation + appendNodeFour + date + appendNodeFive + cur_ele.type + appendNodeSix + cur_ele.status
             + appendNodeLast;
            appendArea.append(appendWholeNode);
        }
        $(".passBtn").click(function () {
            var username = $(this).parent().parent().children().eq(0).children().eq(0).text();
            var statusLabel = $(this).parent().prev().children().eq(0);
            console.log("statusLabel text: " + statusLabel.text());
            console.log("用户名为：" + username);
            $.ajax({
                type: "post",
                url: getContextPath() + "/ticketsManager/changeStatus?username=" + username + "&status=" + "Success",
                success: function (data) {
                    statusLabel.text("Success");
                },
                error: function (error) {
                    console.log(error);
                }
            })
        });
        $(".refuseBtn").click(function () {
            var username = $(this).parent().parent().children().eq(0).children().eq(0).text();
            var statusLabel = $(this).parent().prev().prev().children().eq(0);
            console.log("用户名为：" + username);
            $.ajax({
                type: "post",
                url: getContextPath() + "/ticketsManager/changeStatus?username=" + username + "&status=" + "Refused",
                success: function () {
                    statusLabel.text("Refused");
                },
                error: function (error) {
                    console.log(error);
                }
            })
        })
    }

    $(".settleButton").click(function () {
        var thisButton = $(this);
        var ticketId = thisButton.parent().prev().prev().prev().prev().prev().children().eq(0).text();
        var json = {};
        json.ticketId = ticketId;
        $.ajax({
            type: 'post',
            url: getContextPath() + "/ticketsManager/settle",
            data: json,
            success: function (data) {
                if(data){
                    thisButton.parent().parent().remove();
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    })



    //通过Ajax获取柱状图数据---预订退订情况
    var myChart = echarts.init(document.getElementById('reserveTabPanel'));
    //图表显示提示信息
    myChart.showLoading();
    //定义图表options
    var options1 = {
        color : [ '#3398DB' ],
        title : {
            text : "预订/退订情况统计",
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
        url : getContextPath() + "/ticketsManager/getOrderBarData",
        dataType : "json", //返回数据形式为json
        success : function(result) {
            if (result) {
                //将返回的category和series对象赋值给options对象内的category和series
                //因为xAxis是一个数组 这里需要是xAxis[i]的形式
                options1.xAxis[0].data = result.category;
                options1.series = result.series;
                options1.legend.data = result.legend;

                myChart.hideLoading();
                myChart.setOption(options1);
            }
        },
        error : function(errorMsg) {
            alert("图表请求数据失败啦!");
        }
    });




    //通过Ajax获取柱状图数据---订单金额分布状况，
    var myChart = echarts.init(document.getElementById('revenueTabPanel'));
    //图表显示提示信息
    myChart.showLoading();
    //定义图表options
    var options2 = {
        color : [ '#3398DB' ],
        title : {
            text : "",
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
        url : getContextPath() + "/ticketsManager/getConsumptionData",
        dataType : "json", //返回数据形式为json
        success : function(result) {
            if (result) {
                //将返回的category和series对象赋值给options对象内的category和series
                //因为xAxis是一个数组 这里需要是xAxis[i]的形式
                options2.xAxis[0].data = result.category;
                options2.series = result.series;
                options2.legend.data = result.legend;

                myChart.hideLoading();
                myChart.setOption(options2);
            }
        },
        error : function(errorMsg) {
            alert("图表请求数据失败啦!");
        }
    });


    // /getUserPieData
//    会员信息统计的图表
    var myChart = echarts.init(document.getElementById('userLevelTabPanel'));
    // 初始 option
    //图表显示提示信息
    myChart.showLoading();
    //定义图表options
    var options3 = {
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
    $.ajax({
        type : "post",
        async : false, //同步执行
        url : getContextPath() + "/ticketsManager/getUserPieData",
        dataType : "json", //返回数据形式为json
        success : function(result) {
            if (result) {
                options3.legend.data = result.legend;
                //将返回的category和series对象赋值给options对象内的category和series
                //因为xAxis是一个数组 这里需要是xAxis[i]的形式
                options3.series[0].name = result.series[0].name;
                options3.series[0].type = result.series[0].type;
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
                options3.series[0]['data'] = value;

                myChart.hideLoading();
                myChart.setOption(options3);
            }
        },
        error : function(errorMsg) {
            alert("图表请求数据失败啦!");
        }
    });
});