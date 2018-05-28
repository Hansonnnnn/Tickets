package com.edu.nju.tickets.controller;

import com.edu.nju.tickets.model.User;
import com.edu.nju.tickets.model.UserRepository;
import com.edu.nju.tickets.util.Util;
import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import java.security.GeneralSecurityException;
import java.util.Properties;

/**
 * 该类要提供的接口：登录、注册、验证码发送、修改会员信息
 */
@Controller
@RequestMapping(value = "/login")
public class LoginModalController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/signIn",method = RequestMethod.POST)
    @ResponseBody
    public boolean signIn(HttpSession httpSession, @RequestParam("email")String email,
                      @RequestParam("password")String password){
//        创建USER对象
        System.out.println("email: " + email);
        System.out.println("password: " + password);
        User user = userRepository.findOne(email);
        if(user.getPassword().equals(password) && user.getIsValid() == 1){
            httpSession.setAttribute("username", email);
            return true;
        }
//        登录失败，用户名密码错误
        return false;
    }

    @RequestMapping(value = "/signUp", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean signUp(HttpSession httpSession, @RequestParam("email")String email,
                          @RequestParam("password")String password,
                          @RequestParam("username")String username){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setUsername(username);
        user.setIsVIP(1);
        user.setIntegral(0);
        user.setVIPLevel(1);
        user.setIsValid(1);
        userRepository.save(user);
        httpSession.setAttribute("session", username);
        return true;
    }

    @RequestMapping(value = "/getValidation", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getValidation(@RequestParam("email")String emailAddress)throws GeneralSecurityException {
//        ztrenakpuibpbfha
        // 收件人电子邮箱
        String to = emailAddress;

        // 发件人电子邮箱
        String from = "954618625@qq.com";

        // 指定发送邮件的主机为 smtp.qq.com
        String host = "smtp.qq.com";  //QQ 邮件服务器

        // 获取系统属性
        Properties properties = System.getProperties();

        // 设置邮件服务器
        properties.setProperty("mail.smtp.host", host);

        properties.put("mail.smtp.auth", "true");
        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.ssl.socketFactory", sf);
        // 获取默认session对象
        Session session = Session.getDefaultInstance(properties,new Authenticator(){
            public PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication("954618625@qq.com", "ztrenakpuibpbfha"); //发件人邮件用户名、密码
            }
        });

//        生成随机验证码
        String validationCode = Util.getValidationCode();

        try{
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);

            // Set From: 头部头字段
            message.setFrom(new InternetAddress(from));

            // Set To: 头部头字段
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: 头部头字段
            message.setSubject("Ticket系统欢迎您注册使用！");

            // 设置消息体
            message.setText("验证码为：" + validationCode);

            // 发送消息
            Transport.send(message);
            System.out.println("Sent message successfully....from runoob.com");
        }catch (MessagingException mex) {
            mex.printStackTrace();
        }
        return validationCode;
    }

//    /**
//     * 目前要修改什么信息还没确定
//     * @return
//     */
//    @RequestMapping(value = "/editInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
//    @ResponseBody
//    public boolean editInfo(){
//
//        return true;
//    }
    @RequestMapping(value = "/logout", method =  RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean logout(HttpSession httpSession, @RequestParam("email")String email){
        httpSession.setAttribute("username", "");
        return true;
    }

    @RequestMapping(value = "/stopVIP", method =  RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public boolean stopVIP(HttpSession httpSession, @RequestParam("email")String email){
        httpSession.setAttribute("username", "");
        User user = userRepository.findOne(email);
        user.setIsValid(-1);
        userRepository.save(user);
        return true;
    }

}
