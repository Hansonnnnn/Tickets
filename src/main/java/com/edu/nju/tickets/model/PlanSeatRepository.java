package com.edu.nju.tickets.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanSeatRepository extends JpaRepository<PlanSeat, String> {
    @Override
    List<PlanSeat> findAll();

    @Override
    PlanSeat findOne(String s);

    List<PlanSeat> findDistinctByPlan_id(Integer id);

    List<PlanSeat> findByPriceAndPlan(double price, Plan plan);

    List<PlanSeat> findByCoordinateAndPlan(String coordinate, Plan plan);

}
