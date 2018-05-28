package com.edu.nju.tickets.pojo;

import com.edu.nju.tickets.model.Plan;

import java.util.List;

public class PlanListVO {
    private List<PlanVO> planList;

    public PlanListVO() { }

    public PlanListVO(List<PlanVO> planList) {
        this.planList = planList;
    }

    public List<PlanVO> getPlanList() {
        return planList;
    }

    public void setPlanList(List<PlanVO> planList) {
        this.planList = planList;
    }
}
