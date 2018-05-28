$(function () {
    //style="width: 18rem;"
    console.log("sadas");
    var appendAnchor = $("#appendCardsAreaAnchor");
    var appendNode = "<div class=\"col-md-4\" style='margin-top: 10px;'>\n" +
        "            <div class=\"card\">\n" +
        "                <img class=\"card-img-top\" src=\"\" alt=\"\"/>\n" +
        "                <div class=\"card-body\">\n" +
        "                    <h5 class=\"card-title\"></h5>\n" +
        "                    <p class=\"card-text\"></p>\n" +
        "                    <p class=\"card-text\"></p>\n" +
        "                    <a href=\"\" class=\"btn btn-primary\">查看详情</a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>";
    $.ajax({
        type: 'post',
        url: getContextPath() + "/welcome/getRecommendedPlans",
        success: function (data) {
            var plansList = data.planVOList;
            var curEle;
            var planId, planLocation, planPosterUrl, planName, planTime, planLowestPrice;
            for(var i = 0;i < plansList.length;i++){
                curEle = plansList[i];
                planId = curEle.id;
                planPosterUrl = curEle.purl;
                planLocation = "【" + curEle.location + "】";
                planName = curEle.pname;
                planTime = "【时间】" + curEle.pdate;
                planLowestPrice = "【价格】" + curEle.lowestPrice + "起";
                var node = $(appendNode).insertAfter(appendAnchor);
                node.find("img").eq(0).attr("src", planPosterUrl);
                node.find("h5").eq(0).text(planLocation + planName);
                var pSet = node.find("p");
                pSet.eq(0).text(planTime);
                pSet.eq(1).text(planLowestPrice);
                node.find("a").eq(0).click(function (e) {
                    e.preventDefault();
                    console.log("这场活动的id：" + planId);
                    window.location.href = getContextPath() + "/planDetails?planId=" + planId;
                })
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
//    首页不需要发起订单，所以不用监听
})