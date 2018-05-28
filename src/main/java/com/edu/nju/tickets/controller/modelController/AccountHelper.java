package com.edu.nju.tickets.controller.modelController;

import com.edu.nju.tickets.model.Account;
import com.edu.nju.tickets.model.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 生成账户时，采用postman发起一个post请求即可
 */
@Controller
@RequestMapping(value = "/account")
public class AccountHelper {
    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping(value = "/createAccount", method = RequestMethod.POST)
    @ResponseBody
    public boolean createAccount(@RequestParam("username")String username,
                                 @RequestParam("password")String password,
                                 @RequestParam("balance")Integer balance){
        Account account = new Account(username, password, balance);
        accountRepository.save(account);
        return true;
    }
}
