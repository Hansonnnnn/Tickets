package com.edu.nju.tickets.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Integer> {
    @Override
    List<Plan> findAll();

    @Override
    Plan findOne(Integer integer);

    List<Plan> findBySusername(String username);

//    这里有个接口想实现，没写出来，想按照username查，查出来按照type去重
}
