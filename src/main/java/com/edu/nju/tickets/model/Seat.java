package com.edu.nju.tickets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue
    private Integer sid;
    private String coordinate;
    private int selected;
    private int selt;

    @ManyToOne(cascade = { CascadeType.REFRESH, CascadeType.MERGE }, optional = false)
    @JoinColumn(name = "stadium_susername")
    private Stadium stadium;

    public Seat() {
        super();
    }

    public Integer getId() {
        return sid;
    }

    public void setId(Integer id) {
        this.sid = id;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    public int getSelected() {
        return selected;
    }

    public void setSelected(int selected) {
        this.selected = selected;
    }

    public int getSelt() {
        return selt;
    }

    public void setSelt(int selt) {
        this.selt = selt;
    }

    public Stadium getStadium() {
        return stadium;
    }

    @JsonBackReference
    public void setStadium(Stadium stadium) {
        this.stadium = stadium;
    }
}
