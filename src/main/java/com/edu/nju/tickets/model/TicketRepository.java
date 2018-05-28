package com.edu.nju.tickets.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    @Override
    Ticket findOne(Integer integer);

    @Override
    List<Ticket> findAll();

    /**
     * 按照用户邮箱查找tickets
     * @param email
     * @return
     */
    List<Ticket> findAllByUserId(String email);

    List<Ticket> findByPlanId(Integer planId);

    List<Ticket> findByIsSettled(Integer isSettled);
}
