package com.edu.nju.tickets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
@Entity
public class PlanSeat {
    @Id
    @GeneratedValue
    private Integer id;
    private String coordinate;
    private Integer selt;
    private double price;

    @ManyToOne(cascade = { CascadeType.REFRESH, CascadeType.MERGE }, optional = false)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    public PlanSeat() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    public Integer getSelt() {
        return selt;
    }

    public void setSelt(Integer selt) {
        this.selt = selt;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Plan getPlan() {
        return plan;
    }

    @JsonBackReference
    public void setPlan(Plan plan) {
        this.plan = plan;
    }
}
