package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.*;
import com.edu.nju.tickets.pojo.Consumption;
import com.edu.nju.tickets.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 */
@Controller
@RequestMapping(value = "/personalCenter")
public class PersonalCenterController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private TicketRepository ticketRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String visit(Model model, @RequestParam("email")String email){
        User user = userRepository.findOne(email);
        model.addAttribute("user", user);
//        跳转到个人中心界面，但是界面上的thymeleaf变量还没有设置
        List<Ticket> ticketsList = ticketRepository.findAllByUserId(email);
        List<Ticket> unpaidTicketsList = new ArrayList<>();
        List<Ticket> finishedTicketsList = new ArrayList<>();
        List<Ticket> subTicketsList = new ArrayList<>();
        List<Ticket> canceledTicketsList = new ArrayList<>();
        List<Ticket> checkedTicketsList = new ArrayList<>();
        List<Coupon> couponList = couponRepository.findByUserEmailAndIsUsed(email, 0);
//      消费情况怎么搞？根据票的状态，如果是已购买（1）减对应金额；如果是已退订（2）加对应金额
        List<Consumption> consumptionList = new ArrayList<>();
        for(Ticket ticket : ticketsList){
//            已支付
            if(ticket.getStatus() == 1){
                Consumption consumption = new Consumption(ticket.getCreateDate(), "购买", ticket.getPlanName(),"-" + ticket.getTotalPrice());
                consumptionList.add(consumption);
                finishedTicketsList.add(ticket);
            }else if(ticket.getStatus() == 2){
//                已撤销
                Consumption consumption = new Consumption(ticket.getCreateDate(), "退订", ticket.getPlanName(),"+" + ticket.getTotalPrice());
                consumptionList.add(consumption);
                subTicketsList.add(ticket);
            }else if(ticket.getStatus() == 0){
//                待支付
                if(DateUtil.getDistanceMinute(DateUtil.getStringDate(ticket.getCreateDate()), DateUtil.getStringDate(new Date())) >= 15){
                    System.out.println("DateUtil.getDistanceMinute(DateUtil.getStringDate(ticket.getCreateDate()), DateUtil.getStringDate(new Date())) :" + ticket.getId() + DateUtil.getDistanceMinute(DateUtil.getStringDate(ticket.getCreateDate()), DateUtil.getStringDate(new Date())));
//                    执行的是和cancelOrder一样的逻辑
                    ticket.setStatus(-1);
                    ticket.setValidationTime(0);
                    ticketRepository.save(ticket);

//                    取消订单要把使用的优惠券还回去
                    if(ticket.getCouponId() != 0){
                        Coupon coupon = couponRepository.findOne(ticket.getCouponId());
                        coupon.setIsUsed(0);
                        couponRepository.save(coupon);
                    }
//                    并把这个订单加入到已取消订单列表
                    canceledTicketsList.add(ticket);
                }else{
//                    这里还有多长时间失效并不用返回，这个时间应该在点击支付时，向后端发起请求拿到该时间
                    unpaidTicketsList.add(ticket);
                }

            }else if(ticket.getStatus() == -1){
//                已取消
                canceledTicketsList.add(ticket);
            }else if(ticket.getStatus() == 3){
//                已检票
                checkedTicketsList.add(ticket);
            }
        }

        model.addAttribute("couponList", couponList);
//        model.addAttribute("ticketsList", ticketsList);
        model.addAttribute("unpaidTicketsList", unpaidTicketsList);
        model.addAttribute("finishedTicketsList", finishedTicketsList);
        model.addAttribute("subTicketsList", subTicketsList);
        model.addAttribute("canceledTicketsList",canceledTicketsList);
        model.addAttribute("checkedTicketsList",checkedTicketsList);
        model.addAttribute("consumptionList", consumptionList);
        return "PersonalCenterPage";
    }

    @RequestMapping(value = "/editPersonalInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public boolean editPersonalInfo(@RequestParam("email")String email,
                                    @RequestParam("password")String password,
                                    @RequestParam("username")String username){
        User user = userRepository.findOne(email);
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        return true;
    }
}
