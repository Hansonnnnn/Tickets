package com.edu.nju.tickets.pojo;

import com.edu.nju.tickets.model.Coupon;

import java.util.List;

public class CouponsListVO {
    private List<Coupon> couponList;

    public CouponsListVO() {
    }

    public CouponsListVO(List<Coupon> couponList) {
        this.couponList = couponList;
    }

    public List<Coupon> getCouponList() {
        return couponList;
    }

    public void setCouponList(List<Coupon> couponList) {
        this.couponList = couponList;
    }
}
