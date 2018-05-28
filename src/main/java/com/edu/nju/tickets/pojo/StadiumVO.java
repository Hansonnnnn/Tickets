package com.edu.nju.tickets.pojo;

import javax.xml.crypto.Data;
import java.util.Date;

//根据用户名，查找表中所有值：名称、地址、最后修改时间、审核状态、场馆类型---但没有密码
public class StadiumVO {
    private String name;
    private String location;
    private Date lastDate;
    private String status;//审核状态
    private String type;//a or b
    private String[] seatsConfig;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getLastDate() {
        return lastDate;
    }

    public void setLastDate(Date lastDate) {
        this.lastDate = lastDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String[] getSeatsConfig() {
        return seatsConfig;
    }

    public void setSeatsConfig(String[] seatsConfig) {
        this.seatsConfig = seatsConfig;
    }
}
