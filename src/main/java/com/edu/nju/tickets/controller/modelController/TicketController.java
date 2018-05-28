package com.edu.nju.tickets.controller.modelController;

import com.edu.nju.tickets.model.*;
import com.edu.nju.tickets.pojo.TicketsListVO;
import com.edu.nju.tickets.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * 该类负责订单的相关操作：订单生成（未支付）、订单取消（订单时间到期未支付、）
 *
 */
@Controller
@RequestMapping(value = "/ticket")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlanSeatRepository planSeatRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private PlanRepository planRepository;

    /**
     * 返回生成订单的id
     * @param stadiumName
     * @param location
     * @param planName
     * @param planDate
     * @param seatsAndPrices
     * @param totalPrice
     * @param status
     * @param couponId
     * @param email
     * @param type
     * @param validationTime
     * @return 返回ticketId的原因是：取消订单的时候使用
     */
    @RequestMapping(value = "/createOrder", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Integer createOrder(@RequestParam("sname")String stadiumName,
                            @RequestParam("location")String location,
                            @RequestParam("planId")Integer planId,
                            @RequestParam("planName")String planName,
                            @RequestParam("planDate")String planDate,
                            @RequestParam("seatsAndPrices")String seatsAndPrices,
                            @RequestParam("totalPrice")double totalPrice,
                               @RequestParam("status")Integer status,
                               @RequestParam("couponId")Integer couponId,
                               @RequestParam("userId")String email,
                               @RequestParam("type")Integer type,
                               @RequestParam("validationTime")long validationTime){
        Ticket ticket = new Ticket();
        ticket.setStadiumName(stadiumName);
        ticket.setLocation(location);
        ticket.setPlanId(planId);
        ticket.setPlanName(planName);
        ticket.setPlanDate(planDate);
        ticket.setSeatsAndPrices(seatsAndPrices);
        ticket.setTotalPrice(totalPrice);
//        这里设置了订单的创建时间
        ticket.setCreateDate(new Date());

        ticket.setStatus(status);
        ticket.setCouponId(couponId);
        ticket.setUserId(email);
        ticket.setType(type);

        String generatedSeatsAndPrice = "";
//        直接配票--------那下面取消订单要将配的票恢复
        if(type == 0){
//            不选座---购买的票价以及对应的数量，都以整体字符串的形式保存在seatsAndPrices字段中，以+连接
//            要去plan_seat表中按照对应planId和价格找到相应数量的座位，设置其selt属性为1
            String[] pricesAndNumSet = seatsAndPrices.split(";");
            for(int i = 0;i < pricesAndNumSet.length;i++){
                double price = Double.parseDouble(pricesAndNumSet[i].split("-")[0]);
                Integer num = Integer.parseInt(pricesAndNumSet[i].split("-")[1]);
                Plan plan = planRepository.findOne(planId);
                List<PlanSeat> planSeatList = planSeatRepository.findByPriceAndPlan(price, plan);
//                这里应该考虑如果票不够的情况
                System.out.println("planSeatList size(): " + planSeatList.size());
//                要生成和选座购买一样的座位格式
                for(int j = 0;j < num;j++){
                    if(j == (num -1)){
                        PlanSeat planSeat = planSeatList.get(j);
                        generatedSeatsAndPrice += (planSeat.getCoordinate() + "-" + planSeat.getSelt() + "-" + planSeat.getPrice());
                        planSeat.setSelt(1);
                        planSeatRepository.save(planSeat);
                    }else{
                        PlanSeat planSeat = planSeatList.get(j);
                        generatedSeatsAndPrice += (planSeat.getCoordinate() + "-" + planSeat.getSelt() + "-" + planSeat.getPrice() + ";");
                        planSeat.setSelt(1);
                        planSeatRepository.save(planSeat);
                    }

                }
            }
            ticket.setSeatsAndPrices(generatedSeatsAndPrice);
        }else{
//            选座去plan_seat表中按照对应"planId"和"coordinate"找到相应数量的座位，设置其selt属性为1
            String[] pricesAndNumSet = seatsAndPrices.split(";");
            for(int i = 0;i < pricesAndNumSet.length;i++){
                String[] singleEle = pricesAndNumSet[i].split("-");//将坐标的每个位置和selt、price都拆开
                String coordinate = singleEle[0] + "-" + singleEle[1] + "-" + singleEle[2];
//                double price = Double.parseDouble(singleEle[4]);
                Plan plan = planRepository.findOne(planId);
                System.out.println("planName ****************: " + plan.getPname());
                System.out.println("coordinate ****************: " + coordinate);
                System.out.println("planId ****************: " + planId);

                List<PlanSeat> planSeatList= planSeatRepository.findByCoordinateAndPlan(coordinate, plan);
                PlanSeat planSeat = planSeatList.get(0);
//                System.out.println("planSeatList size:" + planSeatList.size());
//                for(PlanSeat planSeat:planSeatList){
//                    System.out.println(planSeat.getId() + "" + planSeat.getCoordinate() + "" + planSeat.getPrice());
//                }
//                这里应该考虑如果票不够的情况
                System.out.println(planSeat.getCoordinate() + planSeat.getPlan() + "**********");
//                设置该座位已经售出
                planSeat.setSelt(1);
                planSeatRepository.save(planSeat);
//                要生成和选座购买一样的座位格式
            }
            ticket.setSeatsAndPrices(seatsAndPrices);

        }
        ticket.setValidationTime(validationTime);
        Ticket newTicket = ticketRepository.save(ticket);

        return newTicket.getId();
    }

    /**
     * 如果要取消订单，那么使用的所有的优惠券和支付金额都要退回去---相当于生成订单的反操作，但是订单并不需要真正删除
     * @return
     */
    @RequestMapping(value = "/cancelOrder", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean cancelOrder(@RequestParam("orderId")Integer orderId){
        Ticket ticket = ticketRepository.findOne(orderId);
        ticket.setStatus(-1);
        ticket.setValidationTime(0);
        ticketRepository.save(ticket);

//        取消订单要把使用的优惠券还回去
        if(ticket.getCouponId() != 0){
            Coupon coupon = couponRepository.findOne(ticket.getCouponId());
            coupon.setIsUsed(0);
            couponRepository.save(coupon);
        }
        return true;
    }


    /**
     * 输入密码不正确，返回false；余额小于所要支付的订单金额，返回false；
     * 还要增加用户的积分
     * @param username
     * @param password
     * @param orderId
     * @return
     */
    @RequestMapping(value = "/payOrder", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean payOrder(@RequestParam("username")String username, @RequestParam("password")String password,
                            @RequestParam("orderId")Integer orderId, @RequestParam("email")String email){
        Account account = accountRepository.findOne(username);
        if(account.getPassword().equals(password)){
            Ticket ticket = ticketRepository.findOne(orderId);
            User user = userRepository.findOne(email);
            if(account.getBalance() - ticket.getTotalPrice() >= 0){
                account.setBalance(account.getBalance() - ticket.getTotalPrice());
                accountRepository.save(account);

                ticket.setStatus(1);
                ticket.setValidationTime(0);
                ticketRepository.save(ticket);

//                设置会员积分
                user.setIntegral(user.getIntegral() + (int)ticket.getTotalPrice());
//                改变会员的等级
                int integral = user.getIntegral();
                if(integral >= 0 && integral <= 1000){
                    user.setVIPLevel(1);
                }else if(integral > 1000 && integral <= 2000){
                    user.setVIPLevel(2);
                }else if(integral > 4000 && integral <= 7000){
                    user.setVIPLevel(3);
                }else if(integral > 7000 && integral <= 10000){
                    user.setVIPLevel(4);
                }else if(integral > 10000 && integral <= 20000){
                    user.setVIPLevel(5);
                }
                userRepository.save(user);


//                这里有一个比较难的问题：当一个用户下单之后，怎么将他购买的座位从界面删除掉
//                用planId找对应的coordinate---这个部分的逻辑已经交给createOrder方法实现

                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    @RequestMapping(value = "/getAllOrders", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public TicketsListVO getAllTickets(@RequestParam("email")String email){
        return new TicketsListVO(ticketRepository.findAllByUserId(email));
    }


    @RequestMapping(value = "/debookTicket", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean debookOrder(@RequestParam("ticketId")Integer id){
        Ticket ticket = ticketRepository.findOne(id);
        ticket.setStatus(2);//已撤销
//        这里有一个比较麻烦的逻辑：退订，要将订单的金额返还到对应支付宝账户，并且会员积分也要变
        double totalPrice = ticket.getTotalPrice();
//        之所以将退订的前都返回到我的账户，是因为到最后测试的时候才发现有这么一个需求，所以对数据库表结构的改动比较大，所以出此下策
        Account account = accountRepository.findOne("15905199008");
        account.setBalance(account.getBalance() + totalPrice);
        accountRepository.save(account);

        User user = userRepository.findOne(ticket.getUserId());
        user.setIntegral(user.getIntegral() - (int)totalPrice);
        userRepository.save(user);
        return true;
    }

    /**
     * 该方法可以拿到还有多长时间订单失效的时间
     * @param id
     * @return
     */
    @RequestMapping(value = "/getValidationTime", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public long getValidationTime(@RequestParam("orderId")Integer id){
        Ticket ticket = ticketRepository.findOne(id);
        return 15 - DateUtil.getDistanceMinute(DateUtil.getStringDate(ticket.getCreateDate()), DateUtil.getStringDate(new Date()));
    }

    @RequestMapping(value = "/checkTicket", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean checkTicket(@RequestParam("ticketId")Integer ticketId){
        Ticket ticket = ticketRepository.findOne(ticketId);
        ticket.setStatus(3);
        ticketRepository.save(ticket);
        return true;
    }
}
