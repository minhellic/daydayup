<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>highchart4测试导航页</title>
<!-- 自定义的页面样式 -->
<link href="${pageContext.request.contextPath}/css/index.css"
	rel="stylesheet" type="text/css" />

<!-- highchart4或highstock4必须的js库 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/pub/jquery-1.11.3.js"></script>
<!-- highstock中完全包含了highchart，不能重复引用 -->
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/js/pub/highcharts.js"></script> --%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/pub/highstock.js"></script>

<!-- 默认的拆线图表 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/charts/line.js"></script>
<!-- 简单柱状图 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/charts/column.js"></script>
<!-- 包含负值的条形图 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/charts/bar.js"></script>
<!-- 基本饼图 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/charts/pie.js"></script>
<!-- 柱状图，饼图，折线图组合 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/charts/combo1.js"></script>
<!-- 蜡烛图 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/stocks/candlestick.js"></script>
<!-- 蜡烛图 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/stocks/zyh.js"></script>

</head>
<body>
	<div class="main">
		<!-- 页面展示的标题 -->
		<div class="pageTitle">highchart4图表展示</div>
		<hr />

		<!-- 默认的折线图 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="line" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					默认的拆线图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/charts/line.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

		<!-- 简单柱状图 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="column" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					简单柱状图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/charts/column.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

		<!-- 包含负值的条形图 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="bar" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					包含负值的条形图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/charts/bar.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

		<!-- 基本饼图 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="pie" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					基本饼图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/charts/pie.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

		<!-- 柱状图，饼图，折线图组合 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="combo1" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					柱状图，饼图，折线图组合&emsp;<a
						href="${pageContext.request.contextPath}/jsp/charts/combo1.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

	</div>

	<div class="main">
		<!-- 页面展示的标题 -->
		<div class="pageTitle">highstock4图表展示</div>
		<hr />

		<!-- 蜡烛图 -->
		<div>
			<div class="showbox">
				<div class="border charts">
					<div id="candlestick" style="min-width: 400px; height: 340px;"></div>
				</div>
				<div class="label">
					蜡烛图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/stocks/candlestick.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

		<!-- 宗易汇5分钟指数图 -->
		<div>
			<div class="showbox">
				<div class="border charts" style="position: relative;">
					<div id="report"
						style="height: 10px; position: absolute; top: -150px; left: 0; z-index: 9999;"></div>
					<div id="zyh" style="min-width: 400px; height: 330px;"></div>
				</div>
				<div class="label">
					宗易汇5分钟指数图&emsp;<a
						href="${pageContext.request.contextPath}/jsp/stocks/zyh.jsp"
						target="blank">查看原图</a>
				</div>
			</div>
		</div>

	</div>

</body>
</html>