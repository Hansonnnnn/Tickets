<%--
  Created by IntelliJ IDEA.
  User: xiezhenyu
  Date: 2018/2/7
  Time: 18:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>座位布局</title>
</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Tickets</a>
        </div>
        <div class="collapse navbar-collapse">
            <form class="navbar-form navbar-left" >
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search" id="searchInput" style="width: 300px;">
                </div>
                <button type="submit" class="btn btn-default">搜索</button>
            </form>
            <button type="button" class="btn btn-primary navbar-btn navbar-right" style="margin-right: 1px" data-toggle="modal" data-target="#loginModal">登录/注册</button>
            <button type="button" class="btn btn-link navbar-btn navbar-right">场馆申请</button>
        </div>
    </div>
</nav>
</body>
</html>

