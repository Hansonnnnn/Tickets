package com.edu.nju.tickets.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    List<Seat> findByStadium_susername(String susername);
}
