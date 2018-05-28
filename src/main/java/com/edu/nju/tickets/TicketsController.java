package com.edu.nju.tickets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketsController {
    @Autowired
    private TicketsRepository ticketsRepository;

    @Autowired
    private TicketsService ticketsService;

    @GetMapping(value = "/list")
    public List<Tickets> getList(){
        return ticketsRepository.findAll();
    }

    /**
     * 新增
     * @param cupSize
     * @param age
     * @return
     */
    @PostMapping(value = "/add")
    public Tickets addTickets(@RequestParam(value = "cupSize", required = true) String cupSize,
                              @RequestParam(value = "age", required = true) Integer age){
        Tickets tickets = new Tickets();
        tickets.setCupSize(cupSize);
        tickets.setAge(age);
        return ticketsRepository.save(tickets);
    }

    @GetMapping(value = "/tickets/{id}")
    public Tickets findOneTickets(@PathVariable(value = "id")Integer id){
        return ticketsRepository.findOne(id);
    }

    /**
     * update和add的区别，add不用设置id（即主键）
     * @param id
     * @param cupSize
     * @param age
     * @return
     */
    @PutMapping(value = "/tickets/{id}")
    public Tickets updateTickets(@PathVariable("id")Integer id,
                                 @RequestParam("cupSize")String cupSize,
                                 @RequestParam("age")Integer age){
        Tickets tickets = new Tickets();
        tickets.setId(id);
        tickets.setCupSize(cupSize);
        tickets.setAge(age);
        return ticketsRepository.save(tickets);
    }

    @DeleteMapping(value = "/tickets/{id}")
    public void deleteTicket(@PathVariable("id")Integer id){
        ticketsRepository.delete(id);
    }

    @GetMapping(value = "tickets/age/{age}")
    public List<Tickets> findTicketsByAge(@PathVariable("age")Integer age){
        return ticketsRepository.findByAge(age);
    }

    @GetMapping(value = "tickets/insertTickets")
    public void insertTwoTickets(){
        ticketsService.transactionTest();
        //
    }
}
