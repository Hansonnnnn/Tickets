package com.edu.nju.tickets.util;

import com.edu.nju.tickets.model.PlanSeat;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

public class DataUtil {
    /**
     * 将数据库中所有PlanSeat查找出来，对齐进行去重，最后返回每个PlanList中唯一价格组成的数组
     * @param planSeats
     * @return
     */
    public Double[] removeDuplicated(List<PlanSeat> planSeats){
        ArrayList<Double> result = new ArrayList<>();
        double price;
        for (PlanSeat planSeat :planSeats) {
             price = planSeat.getPrice();
            if (!result.contains(price)){
                result.add(price);
            }
        }
        return result.toArray(new Double[result.size()]);
    }

    public double getLowestPrice(List<PlanSeat> planSeats){
        Double[] doublePrices = removeDuplicated(planSeats);
        double lowestPrice = doublePrices[0];
        for(int i = 0;i < doublePrices.length;i++){
            double curEle = doublePrices[i];
            if(curEle < lowestPrice){
                lowestPrice = curEle;
            }
        }
        return lowestPrice;
    }

    public String[] getSeatData(List<PlanSeat> planSeats){
        String seat;
//        返回到前端的座位数据，每个数据都是保存成一个字符串
        String[] seatsConfig = new String[planSeats.size()];
        int index = 0;
        for (PlanSeat planSeat :planSeats) {
            seat = planSeat.getCoordinate() + "-" + planSeat.getSelt() + "-" + planSeat.getPrice();
            seatsConfig[index++] = seat;
        }
        return seatsConfig;
    }
}
