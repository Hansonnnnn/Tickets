package com.edu.nju.tickets;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *测试
 * @authorAngel(QQ:412887952)
 * @version v.0.1
 */
@Controller
@RequestMapping("/hello")
public class HelloController {

    //从 application.properties 中读取配置，如取不到默认值为HelloShanhy
    @Value("${application.hello:Hello Angel}")
    private String hello;

    @RequestMapping(value = "/detailPage", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        modelMap.put("msg", "SpringBoot Ajax 示例");
        return "DetailPage";
    }

    @RequestMapping(value = "/helloJsp")
    public String helloJsp(Map<String,Object> map){
        System.out.println("HelloController.helloJsp().hello="+hello);
        map.put("hello",hello);
        return "hello";
    }

    @RequestMapping(value = "/seats")
    public String seats(){
        return "SeatsManagementPage";
    }

    @RequestMapping(value = "/data", method = RequestMethod.POST)
    @ResponseBody
    public String data() {

        return "/hello/data";
    }
}