package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.Plan;
import com.edu.nju.tickets.model.PlanRepository;
import com.edu.nju.tickets.model.Stadium;
import com.edu.nju.tickets.model.StadiumRepository;
import com.edu.nju.tickets.pojo.PlanVO;
import com.edu.nju.tickets.util.DataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "/planDetails")
public class PlanDetailController {
    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private StadiumRepository stadiumRepository;
    /**
     *
     * @param planId
     * @param model
     * @return
     */
    @RequestMapping(method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public String visit(HttpSession httpSession, Model model, @RequestParam("planId")Integer planId){
        httpSession.setAttribute("username", httpSession.getAttribute("username"));
        PlanVO planVO = new PlanVO();
        Plan plan = planRepository.findOne(planId);
        Stadium stadium = stadiumRepository.findBySusername(plan.getSusername());
        planVO.setId(planId);
        planVO.setSusername(stadium.getSname());
        planVO.setPname(plan.getPname());
        planVO.setPurl(plan.getPosterUrl());
        planVO.setPdate(plan.getPdate());
//      活动的类型，演唱会、、、
        planVO.setPtype(plan.getPtype());
        planVO.setPdes(plan.getPdes());
        planVO.setLocation(stadium.getSlocation());
        planVO.setLowestPrice(new DataUtil().getLowestPrice(plan.getPlanSeats()));
        planVO.setPricesConfig(new DataUtil().removeDuplicated(plan.getPlanSeats()));
        model.addAttribute("plan", planVO);
        return "DetailPage";
    }

    /**
     * 因为前端对座位的设置不好直接使用thymeleaf，所以不得不折中再向后端发起一次请求
     * @param planId
     * @return
     */
    @RequestMapping(value = "/getSeatsData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public PlanVO getSeatsData(@RequestParam("planId")Integer planId){
        PlanVO planVO = new PlanVO();
        Plan plan = planRepository.findOne(planId);
        Stadium stadium = stadiumRepository.findBySusername(plan.getSusername());
        planVO.setSeatsType(stadium.getType());
        planVO.setSeatsConfig(new DataUtil().getSeatData(plan.getPlanSeats()));
        return planVO;
    }


}
