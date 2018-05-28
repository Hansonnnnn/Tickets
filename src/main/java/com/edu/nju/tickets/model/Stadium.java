package com.edu.nju.tickets.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Component
public class Stadium {
    @Id
    private String susername;
    private String password;
    private String sname;
    private String slocation;
    private String type;
    private Date lastModifiedTime;
    private String status;
//    场馆总收入，当结算时使用该属性，并且界面设置总收入的时候用
    private double totalRevenue;

    // @OneToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REMOVE})
    // mappedBy="order": 指明Order类为双向关系维护端，负责外键的更新
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "stadium")
    private List<Seat> seats = new ArrayList<>();

    public Stadium() { }

    public String getSusername() {
        return susername;
    }

    public void setSusername(String susername) {
        this.susername = susername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getSlocation() {
        return slocation;
    }

    public void setSlocation(String slocation) {
        this.slocation = slocation;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * 增加作为
     * @param seat
     */
    public void addSeat(Seat seat){
        this.seats.add(seat);
        seat.setStadium(this);
    }

    public void deleteSeat(Seat seat){
        if(this.seats.contains(seat)){
            seat.setStadium(null);
            this.seats.remove(seat);
        }
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
