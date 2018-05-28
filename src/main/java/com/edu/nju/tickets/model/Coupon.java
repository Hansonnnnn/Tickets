package com.edu.nju.tickets.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 优惠券类
 */
@Entity
public class Coupon {
    @Id
    @GeneratedValue
    private Integer id;
//    用户email
    private String userEmail;
//    满减上限：满upperLimit减discount
    private double upperLimit;
    private double discount;
//    是否已经使用了该优惠券，使用了1，没0
    private Integer isUsed;

    public Coupon() {
    }

    public Coupon(String userEmail, double upperLimit, double discount, Integer isUsed) {
        this.userEmail = userEmail;
        this.upperLimit = upperLimit;
        this.discount = discount;
        this.isUsed = isUsed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public double getUpperLimit() {
        return upperLimit;
    }

    public void setUpperLimit(double upperLimit) {
        this.upperLimit = upperLimit;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public Integer getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(Integer isUsed) {
        this.isUsed = isUsed;
    }
}
