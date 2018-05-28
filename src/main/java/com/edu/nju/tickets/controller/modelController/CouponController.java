package com.edu.nju.tickets.controller.modelController;

import com.edu.nju.tickets.model.Coupon;
import com.edu.nju.tickets.model.CouponRepository;
import com.edu.nju.tickets.model.User;
import com.edu.nju.tickets.model.UserRepository;
import com.edu.nju.tickets.pojo.CouponsListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 该类实现的功能：获取某个用户的所有优惠券、获取某个用户最高的优惠额度的优惠券、生成优惠券（用积分兑换优惠券）
 */
@Controller
@RequestMapping(value = "/coupon")
public class CouponController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CouponRepository couponRepository;


    /**
     * 积分换取优惠券规则
     * 购买得10%积分，1000积分换满1000减300，500积分换满500减130，300积分换满300减60，100积分换满100减20
     * @param email
     * @param integral
     * @return
     */
    @RequestMapping(value = "/createCoupon", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean createCoupon(@RequestParam("email")String email, @RequestParam("integral")Integer integral){
        User user = userRepository.findOne(email);
        Integer leftIntegral = user.getIntegral();
        if(leftIntegral >= integral){
            Coupon coupon = new Coupon();
            switch (integral){
                case 1000:
                    coupon = new Coupon(email, 1000, 300, 0);
                    break;
                case 500:
                    coupon = new Coupon(email, 500, 130,0);
                    break;
                case 300:
                    coupon = new Coupon(email, 300, 60,0);
                    break;
                case 100:
                    coupon = new Coupon(email, 100, 20,0);
                    break;
            }
            user.setIntegral(leftIntegral - integral);
            couponRepository.save(coupon);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }
    }

    @RequestMapping(value = "/getAllCoupons", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public CouponsListVO getAllCoupons(@RequestParam("userEmail")String email){
        System.out.println("email: " + email);
        return new CouponsListVO(couponRepository.findByUserEmail(email));
    }


    /**
     * 该方法的问题：获取最高优惠之后，就代表用户使用了这张优惠券，要不要从数据表中删除
     * @param limit
     * @param userEmail
     * @return
     */
    @RequestMapping(value = "/getHighestCoupon", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Coupon getHighestCoupon(@RequestParam("upperLimit")double limit, @RequestParam("userEmail")String userEmail){
        List<Coupon> couponList = couponRepository.findByUserEmail(userEmail);
        Coupon coupon = new Coupon();
        if(couponList.size() != 1 && couponList.size() != 0){
            for(int i = 0;i < couponList.size()-1;i++){
                Coupon lastCoupon = couponList.get(i);
                if((lastCoupon.getUpperLimit() <= limit) && (couponList.get(i+1).getUpperLimit() >= limit)){
                    coupon.setId(lastCoupon.getId());
                    coupon.setUpperLimit(lastCoupon.getUpperLimit());
                    coupon.setDiscount(lastCoupon.getDiscount());
                    coupon.setUserEmail(lastCoupon.getUserEmail());
                }
            }
            coupon.setIsUsed(1);
            couponRepository.save(coupon);
        }else if(couponList.size() == 1){
            Coupon lastCoupon = couponList.get(0);
            if(lastCoupon.getUpperLimit() <= limit){
                coupon.setId(lastCoupon.getId());
                coupon.setUpperLimit(lastCoupon.getUpperLimit());
                coupon.setDiscount(lastCoupon.getDiscount());
                coupon.setUserEmail(lastCoupon.getUserEmail());
                coupon.setIsUsed(1);
                couponRepository.save(coupon);
            }
        }else{
            coupon.setUpperLimit(0);
            coupon.setDiscount(0);
        }

        return coupon;
    }


}


