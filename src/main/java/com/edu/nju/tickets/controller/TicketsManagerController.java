package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.*;
import com.edu.nju.tickets.pojo.StadiumsListVO;
import com.edu.nju.tickets.pojo.echart.EchartData;
import com.edu.nju.tickets.pojo.echart.Series;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/ticketsManager")
public class TicketsManagerController {
    @Autowired
    private StadiumRepository stadiumRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String visit(Model model){
        List<Ticket> ticketList = ticketRepository.findByIsSettled(0);
        model.addAttribute("ticketList",ticketList);
        return "TicketsManagersPCPage";
    }

    @RequestMapping(value = "/data", method = RequestMethod.POST)
    @ResponseBody
    public StadiumsListVO getData(){
        List<Stadium> sourceStadiumList = stadiumRepository.findAll();
        //有必要再过滤一下：如果status是Waited才往回传
        List<Stadium> returnStadiumList = new ArrayList<>();
        Stadium stadium;
        for(int i = 0;i < sourceStadiumList.size();i++){
            stadium = sourceStadiumList.get(i);
            if(stadium.getStatus().equals("Waited")){
                stadium.setPassword("***");
                returnStadiumList.add(stadium);
            }
        }
        StadiumsListVO stadiumsListVO = new StadiumsListVO();
        stadiumsListVO.setStadiumList(returnStadiumList);
        return stadiumsListVO;
    }

    @RequestMapping(value = "/changeStatus", method = RequestMethod.POST)
    @ResponseBody
    public void changeStatus(String username, String status){
        Stadium stadium = stadiumRepository.findBySusername(username);
        System.out.println("Date: " + stadium.getLastModifiedTime());
        stadium.setStatus(status);
        stadiumRepository.save(stadium);
    }

    @RequestMapping(value = "/settle", method = RequestMethod.POST)
    @ResponseBody
    public boolean settle(@RequestParam("ticketId")Integer ticketId){
        Ticket ticket = ticketRepository.findOne(ticketId);
//        结算时要增加场馆的收入
        Plan plan = planRepository.findOne(ticket.getPlanId());
        Stadium stadium = stadiumRepository.findBySusername(plan.getSusername());
        stadium.setTotalRevenue(stadium.getTotalRevenue() + ticket.getTotalPrice() * 0.8);
        stadiumRepository.save(stadium);
        ticket.setIsSettled(1);
        ticketRepository.save(ticket);
        return true;
    }

//    柱状图和饼状图的方法
    /**
     * 获得预订退订柱状图的数据
     * @return
     */
    @RequestMapping(value = "/getOrderBarData", method = RequestMethod.POST)
    @ResponseBody
    public EchartData getOrderBarData(){
        List<Ticket> ticketList = ticketRepository.findAll();
        List<String> category = new ArrayList<String>();
        Map<String, Integer> typeAndNums = new HashMap<>();
        List<Map> serisData = new ArrayList<Map>();


        typeAndNums.put("预订",1);
        typeAndNums.put("退订",1);
        int num = 0;
//        经过这一层循环，planList只剩下type不重复的plan
        for(Ticket ticket:ticketList) {
//            已支付和已检票
            if (ticket.getStatus() == 1 || ticket.getStatus() == 3) {
                num = typeAndNums.get("预订");
                num++;
                typeAndNums.put("预订", num);
            } else {
                num = typeAndNums.get("退订");
                num++;
                typeAndNums.put("退订", num);
            }
        }
//        你现在要解决的问题：如何把type和对应的数量对应起来

        List<String> legend = new ArrayList<String>();
        List<Series> series = new ArrayList<Series>();// 纵坐标

        for (Map.Entry<String, Integer> entry: typeAndNums.entrySet()) {
            Map map =new HashMap();
            legend.add(entry.getKey());
            map.put("value", entry.getValue());
            map.put("name", entry.getKey());
            serisData.add(map);
        }

        series.add(new Series("总数比较", "bar", serisData));
        EchartData data = new EchartData(legend, category, series);
        return data;
    }

    /**
     * 所要展示的内容：
     * 用户消费情况：
     * 不同金额有多少用户柱状图
     *
     * @return
     */
    @RequestMapping(value = "/getConsumptionData", method = RequestMethod.POST)
    @ResponseBody
    public EchartData BarData() {
        List<Ticket> ticketList = ticketRepository.findAll();
        List<String> category = new ArrayList<String>();
        List<Integer> serisData=new ArrayList<Integer>();

        Map<Double, Integer> pricesAndNums = new HashMap<>();
        Integer num = 0;
        for(Ticket ticket:ticketList){
            if(!pricesAndNums.keySet().contains(ticket.getTotalPrice())){
                pricesAndNums.put(ticket.getTotalPrice(),1);
            }else{
                num = pricesAndNums.get(ticket.getTotalPrice()) + 1;
                pricesAndNums.put(ticket.getTotalPrice(),num);
            }
        }

        for (Map.Entry<Double, Integer> entry : pricesAndNums.entrySet()) {
            category.add(NumberFormat.getInstance().format(entry.getKey()));
            serisData.add(entry.getValue());
        }
        List<String> legend = new ArrayList<String>(Arrays.asList(new String[] { "总数比较" }));// 数据分组
        List<Series> series = new ArrayList<Series>();// 纵坐标
        series.add(new Series("总数比较", "bar", serisData));
        EchartData data = new EchartData(legend, category, series);
        return data;
    }

    /**
     * 不同会员等级占比饼状图
     * @return
     */
    @RequestMapping(value = "/getUserPieData", method = RequestMethod.POST)
    @ResponseBody
    public EchartData getUserPieData(){
        List<User> userList = userRepository.findAll();
        Map<String, Integer> typeAndNums = new HashMap<>();
//        经过这一层循环，planList只剩下type不重复的plan
        int num = 0;
        for(User user:userList){
            if(!typeAndNums.keySet().contains(user.getVIPLevel())){
                typeAndNums.put(user.getVIPLevel() + "",0);
            }else{
                num = typeAndNums.get(user.getVIPLevel()+"");
                num++;
                typeAndNums.put(user.getVIPLevel() + "",num);
            }
        }

//        你现在要解决的问题：如何把type和对应的数量对应起来

        List<String> legend = new ArrayList<String>();
        List<Map> serisData = new ArrayList<Map>();

        for (Map.Entry<String, Integer> entry: typeAndNums.entrySet()) {
            Map map =new HashMap();
            legend.add(entry.getKey());
            map.put("value", entry.getValue());
            map.put("name", entry.getKey());
            serisData.add(map);
        }
        List<Series> series = new ArrayList<Series>();// 纵坐标
        series.add(new Series("总数比较", "pie",serisData));
        EchartData data = new EchartData(legend,null, series);
        return data;
    }

}
