package com.edu.nju.tickets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TicketsService {
    @Autowired
    private TicketsRepository ticketsRepository;

    @Transactional
    public void transactionTest(){
        Tickets ticketsA = new Tickets();
        ticketsA.setCupSize("E");
        ticketsA.setAge(20);
        ticketsRepository.save(ticketsA);

        Tickets ticketsB = new Tickets();
        ticketsB.setCupSize("C");
        ticketsB.setAge(25);
        ticketsRepository.save(ticketsB);
    }
}
