package com.edu.nju.tickets.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    private String email;
    private String password;
    private String username;

//    是否是会员 1是 0不是
    private Integer isVIP;
//    会员等级
    private Integer VIPLevel;
//    积分---用积分换取优惠券
    private Integer integral;
//    1为正常账号，-1为停止会员资格账号
    private Integer isValid;

    public User() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getIsVIP() {
        return isVIP;
    }

    public void setIsVIP(Integer isVIP) {
        this.isVIP = isVIP;
    }

    public Integer getVIPLevel() {
        return VIPLevel;
    }

    public void setVIPLevel(Integer VIPLevel) {
        this.VIPLevel = VIPLevel;
    }

    public Integer getIntegral() {
        return integral;
    }

    public void setIntegral(Integer integral) {
        this.integral = integral;
    }

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }
}
