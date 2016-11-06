<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>蜡烛图</title>
<!-- 引入highstock4必须的js库 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pub/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pub/highstock.js"></script>

<!-- 引入蜡烛图js -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/stocks/candlestick.js"></script>
</head>
<body>
	<div id="candlestick" style="min-width: 400px; height: 500px;"></div>
</body>
</html>