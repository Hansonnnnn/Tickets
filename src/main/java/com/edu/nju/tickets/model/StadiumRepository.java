package com.edu.nju.tickets.model;

import com.edu.nju.tickets.model.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StadiumRepository extends JpaRepository<Stadium, String> {
    /**
     * 扩展,按用户名查询
     * @param susername
     * @return
     */
    Stadium findBySusername(String susername);
}
