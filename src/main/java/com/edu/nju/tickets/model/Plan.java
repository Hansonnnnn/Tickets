package com.edu.nju.tickets.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * susername + ";" + pname + ";" + pdate + ";" + ptype + ";" + pdes + ";" + finalPriceInfoSet.size()
 */
@Entity
@Component
public class Plan {
    @Id
    @GeneratedValue
    private Integer id;
    private String susername;
    private String pname;
    private String posterUrl;
    private String pdate;
    private String ptype;
    private String pdes;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
    private List<PlanSeat> planSeats = new ArrayList<>();

    public Plan() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSusername() {
        return susername;
    }

    public void setSusername(String susername) {
        this.susername = susername;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getPdate() {
        return pdate;
    }

    public void setPdate(String pdate) {
        this.pdate = pdate;
    }


    public String getPtype() {
        return ptype;
    }

    public void setPtype(String ptype) {
        this.ptype = ptype;
    }


    public String getPdes() {
        return pdes;
    }

    public void setPdes(String pdes) {
        this.pdes = pdes;
    }

    public List<PlanSeat> getPlanSeats() {
        return planSeats;
    }

    public void setPlanSeats(List<PlanSeat> planSeats) {
        this.planSeats = planSeats;
    }

    /**
     * 增加作为
     * @param planSeat
     */
    public void addSeat(PlanSeat planSeat){
        this.planSeats.add(planSeat);
        planSeat.setPlan(this);
    }

    public void deleteSeat(PlanSeat planSeat){
        if(this.planSeats.contains(planSeat)){
            planSeat.setPlan(null);
            this.planSeats.remove(planSeat);
        }
    }
}
