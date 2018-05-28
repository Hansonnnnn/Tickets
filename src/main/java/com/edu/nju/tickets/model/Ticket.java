package com.edu.nju.tickets.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Ticket {
    @Id
    @GeneratedValue
    private Integer id;
//    场馆名称
    private String stadiumName;
//    活动地点
    private String location;
//    活动ID
    private Integer planId;
//    活动名称
    private String planName;
//    活动时间
    private String planDate;
//    座位及价格情况
    private String seatsAndPrices;//    因为最多不选座20张的原因，所以就将其拼接为一个字符串，存储在一起,用"+"
//    订单支付总金额
    private double totalPrice;
//    创建时间
    private Date createDate;
//    票状态: 0-待支付，1-已支付，待检票，2-已退票，3-已检票，-1-失效
    private Integer status;
//    优惠券
    private Integer couponId;
//    关于一个订单还有什么信息
    private String userId;
//  记录生成订单时的毫秒值-前端通过date.getTime()得到该值,存的时候存的是生成订单时间对应的毫秒数，用户中心往上放订单列表的时候
//    判断当前时间与当时时间的差额，如果大于15分钟对应的毫秒数，则该订单失效
    private long validationTime;
//    选座还是不选座，选座为1，不选座为0
    private Integer type;
//  是否被结算0未结算，1为已结算
    private Integer isSettled;

    public Ticket() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getPlanDate() {
        return planDate;
    }

    public void setPlanDate(String planDate) {
        this.planDate = planDate;
    }

    public String getSeatsAndPrices() {
        return seatsAndPrices;
    }

    public void setSeatsAndPrices(String seatsAndPrices) {
        this.seatsAndPrices = seatsAndPrices;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCouponId() {
        return couponId;
    }

    public void setCouponId(Integer couponId) {
        this.couponId = couponId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getValidationTime() {
        return validationTime;
    }

    public void setValidationTime(long validationTime) {
        this.validationTime = validationTime;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getIsSettled() {
        return isSettled;
    }

    public void setIsSettled(Integer isSettled) {
        this.isSettled = isSettled;
    }
}
