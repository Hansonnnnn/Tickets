package com.edu.nju.tickets.util;

import com.edu.nju.tickets.model.Stadium;
import com.edu.nju.tickets.model.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Component
public class Util {
    @Autowired
    private StadiumRepository stadiumRepository;

    public static Util util;

    public Util(){

    }

    @PostConstruct
    public void init(){
        util = this;
        util.stadiumRepository = this.stadiumRepository;
    }
    /**
     * 返回用户名的方法，调用随机字符串生成方法
     * @return
     */
    public static String getUserName(){
        String username = getRandomString(7);
        while(isExisted(username)){
            username = getRandomString(7);
        }
        return username;
    }

    private static String getRandomString(int length){
        //定义一个字符串（A-Z，a-z，0-9）即62位；
        String str="zxcvbnmlkjhgfdsaqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(length);
        for(int i = 0;i < length;i++){
            stringBuilder.append(str.charAt(random.nextInt(62)));
        }
        return stringBuilder.toString();
    }

    /**
     * 判断某个字符串在某个集合中是否存在，存在true，不存在false
     * 这里采用在数据库中查找是否已存在相应的用户名
     * @param string
     * @return
     */
    private static boolean isExisted(String string){
        Stadium stadium = util.stadiumRepository.findBySusername(string);
        if(stadium == null){
            return false;
        }
        return true;
    }

    /**
     * 该方法生成6位随机验证码
     * 大致思路：采用Random的nextInt(10)，每次生成一个0-9之内的数字，采用字符串拼接6次
     * @return
     */
    public static String getValidationCode(){
        String result = "";
        Random random = new Random();
        for(int i = 0;i < 6;i++){
            result += random.nextInt(10);
        }
        return result;
    }
}
