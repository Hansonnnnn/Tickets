package com.edu.nju.tickets.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Integer>{
    @Override
    Coupon findOne(Integer integer);

    List<Coupon> findByUserEmail(String userEmail);

    List<Coupon> findByUserEmailAndIsUsed(String userEmail, Integer isUsed);
}
