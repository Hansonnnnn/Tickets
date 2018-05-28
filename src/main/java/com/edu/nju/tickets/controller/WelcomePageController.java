package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.Plan;
import com.edu.nju.tickets.model.PlanRepository;
import com.edu.nju.tickets.model.Stadium;
import com.edu.nju.tickets.model.StadiumRepository;
import com.edu.nju.tickets.pojo.PlanListVO;
import com.edu.nju.tickets.pojo.PlanVO;
import com.edu.nju.tickets.pojo.RecommendedPlanListVO;
import com.edu.nju.tickets.util.DataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/welcome")
public class WelcomePageController {
    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private StadiumRepository stadiumRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String visit(HttpSession httpSession){
        httpSession.setAttribute("username", httpSession.getAttribute("username"));
        return "WelcomePage";
    }

    @RequestMapping(value = "/getRecommendedPlans", method = RequestMethod.POST)
    @ResponseBody
    public RecommendedPlanListVO getRecommendedPlans(){
        RecommendedPlanListVO planListVO = new RecommendedPlanListVO();
        List<PlanVO> returnPlansList = new ArrayList<>();
        List<Plan> planList = planRepository.findAll();
        Plan plan;
        Stadium stadium;
        for(int i = 0;i < planList.size();i++){
            plan = planList.get(i);
            stadium = stadiumRepository.findBySusername(plan.getSusername());
            PlanVO planVO = new PlanVO();
            planVO.setId(plan.getId());
            planVO.setPname(plan.getPname());
            planVO.setLocation(stadium.getSlocation());
            planVO.setPdate(plan.getPdate());
            planVO.setPurl(plan.getPosterUrl());
            planVO.setLowestPrice(new DataUtil().getLowestPrice(plan.getPlanSeats()));

            returnPlansList.add(planVO);
        }
        planListVO.setPlanVOList(returnPlansList);
        return planListVO;
    }
}
