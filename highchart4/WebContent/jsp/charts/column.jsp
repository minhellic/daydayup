<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>简单柱状图</title>
<!-- 引入highchart4必须的js库 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pub/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pub/highcharts.js"></script>

<!-- 引入简单柱状图 js -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/charts/column.js"></script>
</head>
<body>
	<div id="column" style="min-width: 400px; height: 500px;"></div>
</body>
</html>