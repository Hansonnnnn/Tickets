package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.Stadium;
import com.edu.nju.tickets.model.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/sregister")
public class StadiumRegisterController {
    @Autowired
    private StadiumRepository stadiumRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String visit(ModelMap modelMap){
        modelMap.put("msg", "测试信息");
        return "StadiumRegisterPage";
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean login(@RequestParam("username")String username,
                         @RequestParam("password")String password){
        Stadium stadium = stadiumRepository.findBySusername(username);
        if(stadium.getPassword().equals(password)){
            return true;
        }else{
            return false;
        }
    }
}
