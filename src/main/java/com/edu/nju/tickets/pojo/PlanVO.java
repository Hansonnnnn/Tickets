package com.edu.nju.tickets.pojo;

/**
 * 这个类存在的意义，将界面需要的关于plan的元素包装进来，因为包含的元素比plan实体类要多，所以有这个类
 */
public class PlanVO {
    private Integer id;
    private String susername;
    private String pname;
    private String purl;
    private String pdate;
    private String ptype;
    private String pdes;
    private String seatsType;
    private String location;
    private double lowestPrice;

//    private String[] returnSeatsConfig;
    private Double[] pricesConfig;
    private String[] seatsConfig;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSusername() {
        return susername;
    }

    public void setSusername(String susername) {
        this.susername = susername;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPurl() {
        return purl;
    }

    public void setPurl(String purl) {
        this.purl = purl;
    }

    public String getPdate() {
        return pdate;
    }

    public void setPdate(String pdate) {
        this.pdate = pdate;
    }

    public String getPtype() {
        return ptype;
    }

    public void setPtype(String ptype) {
        this.ptype = ptype;
    }

    public String getPdes() {
        return pdes;
    }

    public void setPdes(String pdes) {
        this.pdes = pdes;
    }

//    public String[] getReturnSeatsConfig() {
//        return returnSeatsConfig;
//    }
//
//    public void setReturnSeatsConfig(String[] returnSeatsConfig) {
//        this.returnSeatsConfig = returnSeatsConfig;
//    }


    public String getSeatsType() {
        return seatsType;
    }

    public void setSeatsType(String seatsType) {
        this.seatsType = seatsType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public Double[] getPricesConfig() {
        return pricesConfig;
    }

    public void setPricesConfig(Double[] pricesConfig) {
        this.pricesConfig = pricesConfig;
    }

    public String[] getSeatsConfig() {
        return seatsConfig;
    }

    public void setSeatsConfig(String[] seatsConfig) {
        this.seatsConfig = seatsConfig;
    }
}
