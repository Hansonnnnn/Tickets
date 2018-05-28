var aPart = $("#aPlan");
var bPart = $("#bPlan");
var cPart = $("#cPlan");
/**
 * 设置a区的所有checkbox的值
 */
//    var a_areas = ["a","b","c","d","e","f","g","h","i"];
var a_areas = [0,1,2,3,4,5,6,7,8];
function setAValues(){
    for(var i = 0;i < a_areas.length;i++){
        var areaNumber = a_areas[i];
        var cur_area = $("#aPlan").find("#a_" + areaNumber);
        var cur_rows = cur_area.eq(0).find(".row");
        for(var j = 0;j < cur_rows.length-1;j++){
            var cur_ckBoxes = cur_rows.eq(j).find("input[type='checkbox']");
            for(var k = 0;k < cur_ckBoxes.length;k++){
                cur_ckBoxes.eq(k).val("" + areaNumber + "-" + j + "-" + k);
            }
        }
    }
}
/**
 * 设置b区的所有checkbox的值
 */
//    var b_areas = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
var b_areas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
function setBValues(){
    for(var i = 0;i < b_areas.length;i++){
        var areaNumber = b_areas[i];
        var cur_area = $("#bPlan").find("#b_" + areaNumber);
        var cur_rows = cur_area.eq(0).find(".row");
        for(var j = 0;j < cur_rows.length-1;j++){
            var cur_ckBoxes = cur_rows.eq(j).find("input[type='checkbox']");
            for(var k = 0;k < cur_ckBoxes.length;k++){
                cur_ckBoxes.eq(k).val("" + areaNumber + "-" + j + "-" + k);
            }
        }
    }
}
$(function () {
    //用for循环为座位辅助栏的复选框添加事件---结果没有这样做的原因：如果用for循环，在var cor_area = 这一行的时候，
// 要根据不同的区按钮，选择不同区的变量，因为变量名已经是硬编码，所以不能使用字符串拼接来使用变量
//如果不提前把变量找出来，而是每次现找变量
//问题出现在：mutable variable accessible from closure：http://blog.csdn.net/zuiku_baozi/article/details/40262777
    var a_a_area = $("#a_0").find("input[type='checkbox']");
    var a_b_area = $("#a_1").find("input[type='checkbox']");
    var a_c_area = $("#a_2").find("input[type='checkbox']");
    var a_d_area = $("#a_3").find("input[type='checkbox']");
    var a_e_area = $("#a_4").find("input[type='checkbox']");
    var a_f_area = $("#a_5").find("input[type='checkbox']");
    var a_g_area = $("#a_6").find("input[type='checkbox']");
    var a_h_area = $("#a_7").find("input[type='checkbox']");
    var a_i_area = $("#a_8").find("input[type='checkbox']");
//    for(var i = 0;i < a_areas.length;i++){
//        var currentArea = a_areas[i];
//        $("#a_" + currentArea + "_checkbox").click(function () {
//            var cor_area = $("#a_" + currentArea).find("input[type='checkbox']");
//            console.log("length" + cor_area.length);
//            if($(this).prop("checked")){
//                console.log("true---branch");
//                for(var j = 0;j < cor_area.length;j++){
//                    console.log("true---branch" + j);
//                    cor_area.eq(j).prop("checked", true);
//                }
//            }else{
//                console.log("false---branch");
//                for(var j = 0;j < cor_area.length;j++){
//                    console.log("false---branch" + j);
//                    cor_area.eq(j).prop("checked", false);
//                }
//            }
//        })
//    }
    $("#a_a_checkbox").click(function () {
        //这个变量出现的意义：如果使用a_a_area，将在四个地方使用，不断复制之后，修改的地方会×4
        var uniVar = a_a_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_b_checkbox").click(function () {
        var uniVar = a_b_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_c_checkbox").click(function () {
        var uniVar = a_c_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_d_checkbox").click(function () {
        var uniVar = a_d_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_e_checkbox").click(function () {
        var uniVar = a_e_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_f_checkbox").click(function () {
        var uniVar = a_f_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_g_checkbox").click(function () {
        var uniVar = a_g_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_h_checkbox").click(function () {
        var uniVar = a_h_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#a_i_checkbox").click(function () {
        var uniVar = a_i_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });


    setAValues();
//aPlan设置完毕

    var b_a_area = $("#b_0").find("input[type='checkbox']");
    var b_b_area = $("#b_1").find("input[type='checkbox']");
    var b_c_area = $("#b_2").find("input[type='checkbox']");
    var b_d_area = $("#b_3").find("input[type='checkbox']");
    var b_e_area = $("#b_4").find("input[type='checkbox']");
    var b_f_area = $("#b_5").find("input[type='checkbox']");
    var b_g_area = $("#b_6").find("input[type='checkbox']");
    var b_h_area = $("#b_7").find("input[type='checkbox']");
    var b_i_area = $("#b_8").find("input[type='checkbox']");
    var b_j_area = $("#b_9").find("input[type='checkbox']");
    var b_k_area = $("#b_10").find("input[type='checkbox']");
    var b_l_area = $("#b_11").find("input[type='checkbox']");
    var b_m_area = $("#b_12").find("input[type='checkbox']");
    var b_n_area = $("#b_13").find("input[type='checkbox']");
    var b_o_area = $("#b_14").find("input[type='checkbox']");
    var b_p_area = $("#b_15").find("input[type='checkbox']");

    $("#b_a_checkbox").click(function () {
        var uniVar = b_a_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_b_checkbox").click(function () {
        var uniVar = b_b_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_c_checkbox").click(function () {
        var uniVar = b_c_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_d_checkbox").click(function () {
        var uniVar = b_d_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_e_checkbox").click(function () {
        var uniVar = b_e_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_f_checkbox").click(function () {
        var uniVar = b_f_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_g_checkbox").click(function () {
        var uniVar = b_g_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_h_checkbox").click(function () {
        var uniVar = b_h_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_i_checkbox").click(function () {
        var uniVar = b_i_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_j_checkbox").click(function () {
        var uniVar = b_j_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_k_checkbox").click(function () {
        var uniVar = b_k_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_l_checkbox").click(function () {
        var uniVar = b_l_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_m_checkbox").click(function () {
        var uniVar = b_m_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_n_checkbox").click(function () {
        var uniVar = b_n_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_o_checkbox").click(function () {
        var uniVar = b_o_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });
    $("#b_p_checkbox").click(function () {
        var uniVar = b_p_area;
        if($(this).prop("checked")){
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", true);
            }
        }else{
            for(var j = 0;j < uniVar.length;j++){
                uniVar.eq(j).prop("checked", false);
            }
        }
    });


    setBValues();



});
/**
 * 提交信息方法--实现思路：
 * 1.获得公共的部分--最上面三项信息
 * 2.根据点击的不同按钮，调用a、b、c区不同的方法
 */
/**
 * a方案和b方案的实现思路几乎一致，差别是区的多少不同
 * 实现思路：
 * 1.找到所有已选中的checkbox
 * 2.需要什么数据就可以确定一个座位的相应位置：区号-行号-列号
 * 3.怎么找--如果某个区没勾选-就不在这个区遍历；如果这个区勾选，获得其value-value中保存了对应的区号-行号-列号--这个value是怎么设置上去的
 * value通过setXValue设置上去的
 *
 */
/**
 * a、b两种方案的信息提交方法
 * @param type a or b
 */
function submit(type) {
    var part;
    if(type === "a"){
        part = aPart;
    }else{
        part = bPart;
    }
    var finalResult = [];
    var ckbSet = part.find(".seatsBlock").eq(0).find("input[type='checkbox']");
    var finalResultIndex = 0;
    for(var k = 0;k < ckbSet.length;k++){
        var cur_ckb = ckbSet.eq(k);
        if(cur_ckb.prop("checked")){
            finalResult[finalResultIndex] = cur_ckb.val() + "-1";
            finalResultIndex++;
        }else{
            finalResult[finalResultIndex] = cur_ckb.val() + "-0";
            finalResultIndex++;
        }
    }

    return finalResult;
}
function planSeatsSubmit(type) {
    var part;
    if(type === "a"){
        part = aPart;
    }else{
        part = bPart;
    }
    var finalResult = [];
    var ckbSet = part.find(".seatsBlock").eq(0).find("input[type='checkbox']");
    var finalResultIndex = 0;
    for(var k = 0;k < ckbSet.length;k++){
        var cur_ckb = ckbSet.eq(k);
        if(cur_ckb.prop("checked")){
            if(!cur_ckb.prop("disabled")){
                finalResult[finalResultIndex] = cur_ckb.val() + "-1";
                finalResultIndex++;
            }else{
                finalResult[finalResultIndex] = cur_ckb.val() + "-0";
                finalResultIndex++;
            }
        }else{
            finalResult[finalResultIndex] = cur_ckb.val() + "-0";
            finalResultIndex++;
        }
    }

    return finalResult;
}
