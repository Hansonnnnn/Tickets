package com.edu.nju.tickets.model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 要有一个辅助类生成Account账号
 */
@Entity
public class Account {
    @Id
    private String username;
    private String password;
    private double balance;

    public Account() {
    }

    public Account(String username, String password, Integer balance) {
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
