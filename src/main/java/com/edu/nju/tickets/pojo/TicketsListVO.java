package com.edu.nju.tickets.pojo;

import com.edu.nju.tickets.model.Ticket;

import java.util.List;

public class TicketsListVO {
    private List<Ticket> ticketList;

    public TicketsListVO() {
    }

    public TicketsListVO(List<Ticket> ticketList) {
        this.ticketList = ticketList;
    }

    public List<Ticket> getTicketList() {
        return ticketList;
    }

    public void setTicketList(List<Ticket> ticketList) {
        this.ticketList = ticketList;
    }
}
