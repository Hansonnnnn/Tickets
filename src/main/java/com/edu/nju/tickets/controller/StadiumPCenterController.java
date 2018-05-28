package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.*;
import com.edu.nju.tickets.pojo.PlanListVO;
import com.edu.nju.tickets.pojo.PlanTypePieListVO;
import com.edu.nju.tickets.pojo.PlanVO;
import com.edu.nju.tickets.pojo.StadiumVO;
import com.edu.nju.tickets.pojo.echart.EchartData;
import com.edu.nju.tickets.pojo.echart.Series;
import com.edu.nju.tickets.util.DataUtil;
import com.sun.corba.se.impl.oa.toa.TOA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.util.*;

/**
 * 当场馆方访问个人中心时，要从后端得到的东西为：
 * 根据用户名，查找表中所有值：名称、地址、最后修改时间、审核状态
 * 再查找该stadium_id对应的订单情况，得出统计信息
 */
@Controller
@RequestMapping(value = "/scenter")
public class StadiumPCenterController {
    @Autowired
    private StadiumRepository stadiumRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PlanSeatRepository planSeatRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String visit(Model model, String username){
        System.out.println("username: " + username);
        List<Ticket> finishedTicketsList = new ArrayList<>();
        List<Ticket> subTicketsList = new ArrayList<>();
        List<Plan> planList = planRepository.findBySusername(username);
        for(Plan plan:planList){
            List<Ticket> ticketList = ticketRepository.findByPlanId(plan.getId());
            for(Ticket ticket:ticketList){
                if(ticket.getStatus() == 1 || ticket.getStatus() == 3){
//                    将已支付、已检票的订单放入预订情况中
                    finishedTicketsList.add(ticket);
                }else{
//                    将已取消、已退订的订单放入退订情况中
                    subTicketsList.add(ticket);
                }
            }
        }
        Stadium stadium = stadiumRepository.findBySusername(username);
        model.addAttribute("totalPrice", stadium.getTotalRevenue());
        model.addAttribute("finishedTicketsList", finishedTicketsList);
        model.addAttribute("subTicketsList", subTicketsList);
        return "StadiumPCenter";
    }

    @RequestMapping(value = "/data", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public StadiumVO init(String username){
        StadiumVO stadiumVO = new StadiumVO();
        System.out.println("/data username: " + username);
        Stadium stadium = stadiumRepository.findBySusername(username);
        System.out.println("stadium " + (stadium==null));
        stadiumVO.setName(stadium.getSname());
        stadiumVO.setLocation(stadium.getSlocation());
        stadiumVO.setLastDate(stadium.getLastModifiedTime());
        stadiumVO.setStatus(stadium.getStatus());
        stadiumVO.setType(stadium.getType());
        List<Seat> seats = seatRepository.findByStadium_susername(username);
        System.out.println("seatsList size：" + seats.size());
        String[] seatsConfig = new String[seats.size()];
        for(int i = 0;i < seats.size();i++){
            seatsConfig[i] = seats.get(i).getCoordinate() + "-" + seats.get(i).getSelected() + "-" + seats.get(i).getSelt();
        }
        stadiumVO.setSeatsConfig(seatsConfig);
        return stadiumVO;
    }

    @RequestMapping(value = "/submitPlan", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public void submitPlan(@RequestParam("susername")String susername,
                           @RequestParam("planName")String pname,
                           @RequestParam("planPosterUrl")String url,
                           @RequestParam("planDate")String pdate,
                           @RequestParam("planType")String ptype,
                           @RequestParam("planDescription")String pdes,
                           @RequestParam("finalPriceInfoSet[]")List<String> finalPriceInfoSet){
        Plan plan = new Plan();
        plan.setSusername(susername);
        plan.setPname(pname);
        plan.setPosterUrl(url);
        plan.setPdate(pdate);
        plan.setPtype(ptype);
        plan.setPdes(pdes);
        String[] attrs;
        for(int i = 0; i < finalPriceInfoSet.size();i++){
            PlanSeat planSeat = new PlanSeat();
            attrs = finalPriceInfoSet.get(i).split("-");
            planSeat.setCoordinate(attrs[0] + "-" + attrs[1] + "-" + attrs[2]);
            planSeat.setSelt(Integer.parseInt(attrs[3]));
            planSeat.setPrice(Double.parseDouble(attrs[4]));
            plan.addSeat(planSeat);
        }
        planRepository.save(plan);
        System.out.println(susername + ";" + pname + ";" + pdate + ";" + ptype + ";" + pdes + ";" + finalPriceInfoSet.size());
    }

    @RequestMapping(value = "/getPlansData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public PlanListVO getPlansData(@RequestParam("username")String username){
        System.out.println("getPlansData username: " + username);
        List<Plan> planList = planRepository.findBySusername(username);
        List<PlanVO> planVOList = new ArrayList<>();
        Plan cur_plan;
        for(int i = 0;i < planList.size();i++){
            cur_plan = planList.get(i);
            PlanVO planVO = new PlanVO();
            System.out.println("cur_plan.getId()" + cur_plan.getId());
            List<PlanSeat> planSeats = planSeatRepository.findDistinctByPlan_id(cur_plan.getId());
            System.out.println("planSeats.size()" + planSeats.size());
//            对于价格来说，一个plan对应多个价格，整体返回多个plan---即多个planVO
            Double[] pricesConfig = new DataUtil().removeDuplicated(planSeats);
            planVO.setPname(cur_plan.getPname());
            planVO.setPurl(cur_plan.getPosterUrl());
            planVO.setPdate(cur_plan.getPdate());
            planVO.setPtype(cur_plan.getPtype());
            planVO.setPdes(cur_plan.getPdes());
            planVO.setPricesConfig(pricesConfig);
            planVOList.add(planVO);
        }
        return new PlanListVO(planVOList);
    }

    @RequestMapping(value = "/changeStadiumInfo", method = RequestMethod.POST)
    @ResponseBody
    public void changeStadiumInfo(@RequestParam("username")String username,
                                  @RequestParam("name")String name,
                                  @RequestParam("location")String location){
        Stadium stadium = stadiumRepository.findBySusername(username);
        stadium.setStatus("Waited");
        stadium.setSname(name);
        stadium.setSlocation(location);
        stadium.setLastModifiedTime(new Date());
        stadiumRepository.save(stadium);
    }


    /**
     * 获得饼状图的数据
     * @param username
     * @return
     */
    @RequestMapping(value = "/getPlanTypeData", method = RequestMethod.POST)
    @ResponseBody
    public EchartData getPlanTypeData(@RequestParam("stadiumName")String username){
        List<Plan> planList = planRepository.findBySusername(username);
//        List<String> distinctTypes = new ArrayList<>();
//        List<Integer> values = new ArrayList<>();
        Map<String, Integer> typeAndNums = new HashMap<>();
//        经过这一层循环，planList只剩下type不重复的plan
        for(Plan plan:planList){
            if(!typeAndNums.containsKey(plan.getPtype())){
                typeAndNums.put(plan.getPtype(), 1);
            }else{
                Integer num = typeAndNums.get(plan.getPtype());
                num++;
                typeAndNums.put(plan.getPtype(), num);
            }
        }

        for (String key:typeAndNums.keySet()){
            System.out.println(key + ";" + typeAndNums.get(key));
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

    /**
     * 所要展示的内容：某价格的订单有多少笔----那stadiumName找到所有plan，再拿所有的plan找到所有订单
     * @return
     */
    @RequestMapping(value = "/getRevenueBarData", method = RequestMethod.POST)
    @ResponseBody
    public EchartData BarData(@RequestParam("stadiumName")String username) {
        System.out.println("柱状图");

        List<Plan> planList = planRepository.findBySusername(username);
        List<String> category = new ArrayList<String>();
        List<Integer> serisData=new ArrayList<Integer>();

        Map<Double, Integer> pricesAndNums = new HashMap<>();
        Integer num = 0;
        for(Plan plan:planList){
            List<Ticket> ticketList = ticketRepository.findByPlanId(plan.getId());
            for(Ticket ticket:ticketList){
                if(pricesAndNums.keySet().contains(ticket.getTotalPrice())){
                    num = pricesAndNums.get(ticket.getTotalPrice()) + 1;
                    pricesAndNums.put(ticket.getTotalPrice(), num);
                }else{
                    pricesAndNums.put(ticket.getTotalPrice(), 1);
                }
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
}
