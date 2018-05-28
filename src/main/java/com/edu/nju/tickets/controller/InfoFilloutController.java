package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.Seat;
import com.edu.nju.tickets.model.Stadium;
import com.edu.nju.tickets.model.StadiumRepository;
import com.edu.nju.tickets.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/infoFill")
public class InfoFilloutController {
    @Autowired
    private StadiumRepository stadiumRepository;

    @RequestMapping(method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public String visit(ModelMap modelMap){
        modelMap.put("msg", "SpringBoot Ajax 示例");
        return "InfoFilloutPage";
    }

    @RequestMapping(value = "/aSubmit", method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String aSubmit(ModelMap modelMap, @RequestParam("password")String password,
                          @RequestParam("name")String sname,
                          @RequestParam("location")String slocation,
                          @RequestParam("type")String stype,
                          @RequestParam("seatsConfig[]")List<String> seatsConfig){
//        将对应的密码和生成的用户名存储到数据库
        modelMap.put("msg", "SpringBoot Ajax 示例");
        System.out.println("slocation: " + slocation);
        String username = Util.getUserName();
        Stadium stadium = new Stadium();
        stadium.setSusername(username);
        stadium.setPassword(password);
        stadium.setSname(sname);
        stadium.setSlocation(slocation);
        stadium.setType(stype);
        stadium.setLastModifiedTime(new Date());
        stadium.setStatus("Waited");
        String coordinate;
        String[] attrs;
        for(int i = 0;i< seatsConfig.size();i++){
            Seat seat = new Seat();
            attrs = seatsConfig.get(i).split("-");
            seat.setCoordinate(attrs[0] + "-" + attrs[1] + "-" + attrs[2]);
            seat.setSelected(Integer.parseInt(attrs[3]));
            seat.setSelt(0);
            stadium.addSeat(seat);
        }
        stadiumRepository.save(stadium);
        System.out.println("InfoFilloutController username: " + username);
        modelMap.put("msg", "SpringBoot Ajax 示例");
        return username;
    }

    @RequestMapping(value = "/bSubmit", method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String bSubmit(ModelMap modelMap, @RequestParam("password")String password,
                          @RequestParam("name")String sname,
                          @RequestParam("location")String slocation,
                          @RequestParam("type")String stype,
                          @RequestParam("seatsConfig[]")List<String> seatsConfig){
//        将对应的密码和生成的用户名存储到数据库
        System.out.println("slocation: " + slocation);
        String username = Util.getUserName();
        Stadium stadium = new Stadium();
        stadium.setSusername(username);
        stadium.setPassword(password);
        stadium.setSname(sname);
        stadium.setSlocation(slocation);
        stadium.setType(stype);
        stadium.setLastModifiedTime(new Date());
        stadium.setStatus("Waited");
        String coordinate;
        String[] attrs;
        for(int i = 0;i< seatsConfig.size();i++){
            Seat seat = new Seat();
            attrs = seatsConfig.get(i).split("-");
            seat.setCoordinate(attrs[0] + "-" + attrs[1] + "-" + attrs[2]);
            seat.setSelected(Integer.parseInt(attrs[3]));
            seat.setSelt(0);
            stadium.addSeat(seat);
        }
        stadiumRepository.save(stadium);
        System.out.println("InfoFilloutController username: " + username);
        modelMap.put("msg", "SpringBoot Ajax 示例");
        return username;
    }
}
