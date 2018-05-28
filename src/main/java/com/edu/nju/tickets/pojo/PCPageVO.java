package com.edu.nju.tickets.pojo;

import com.edu.nju.tickets.model.Ticket;

import java.util.List;

public class PCPageVO {
    private List<Ticket> ticketList;

    private List<Consumption> consumptionList;

    public PCPageVO() {
    }

    public PCPageVO(List<Ticket> ticketList, List<Consumption> consumptionList) {
        this.ticketList = ticketList;
        this.consumptionList = consumptionList;
    }

    public List<Ticket> getTicketList() {
        return ticketList;
    }

    public void setTicketList(List<Ticket> ticketList) {
        this.ticketList = ticketList;
    }

    public List<Consumption> getConsumptionList() {
        return consumptionList;
    }

    public void setConsumptionList(List<Consumption> consumptionList) {
        this.consumptionList = consumptionList;
    }
}
