package com.edu.nju.tickets.pojo;

import java.util.Date;

public class Consumption {
//    时间
//    planName
//    type + or -
//    消费总额
    private Date date;
    private String planName;
    private String type;
    private String totalPrice;//有 + or -


    public Consumption(Date date, String type,String planName, String totalPrice) {
        this.date = date;
        this.planName = planName;
        this.type = type;
        this.totalPrice = totalPrice;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }
}
