package com.edu.nju.tickets;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketsRepository extends JpaRepository<Tickets, Integer> {
    List<Tickets> findByAge(Integer age);
}
