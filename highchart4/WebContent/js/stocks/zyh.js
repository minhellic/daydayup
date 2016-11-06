var type = 5;
var index = 0;
//highstock K线图
var highStockChart = function(divID,result){
	var $reporting = $("#report");
	var firstTouch = true;
	//开盘价^最高价^最低价^收盘价^五日均线^十日均线^20日均线^30日均线^昨日均价^成交量^成交额
	var  open,high,low,close,MA5,MA10,MA20,MA30,avl,y,amount;
	//定义数组
	var ohlcArray = [],
	volumeArray = [],
	amountArray = [],
	MA5Array = [],
	MA10Array=[],
	MA20Array=[],
	MA30Array=[],
	dailyData = [],
	data =[];
	var format = "";
	if(type == 5 ||type ==15 ||type ==30 ||type ==60){
		format = '%Y-%m-%d %H:%M';
	}else{
		format = '%Y-%m-%d';
	}
	//常量本地化
	Highcharts.setOptions({
		global : {
			useUTC : false
		},
		lang: {
			rangeSelectorFrom:"日期:",
			rangeSelectorTo:"至",
			rangeSelectorZoom:"范围",
			loading:'加载中...',
			shortMonths:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
			weekdays:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		},
	});
	//格式化数据，准备绘图
	dailyData = result.data.split("~");
	for(i=0;i<dailyData.length-1;i++){
		data[i] = dailyData[i].split("^");
	}
	for (i = 0; i < data.length; i++) {
		ohlcArray.push([
		                parseInt(data[i][0]), // the date
		                parseFloat(data[i][1]), // open
		                parseFloat(data[i][3]), // high
		                parseFloat(data[i][4]), // low
		                parseFloat(data[i][2]) // close
		                ]);
		MA5Array.push([
		               parseInt(data[i][0]), // the date
		               parseFloat(data[i][5])
		               ]);
		MA10Array.push([
		                parseInt(data[i][0]),
		                parseFloat(data[i][6]),
		                ]);
		MA20Array.push([
		                parseInt(data[i][0]),
		                parseFloat(data[i][7]),
		                ]);
		MA30Array.push([
		                parseInt(data[i][0]),
		                parseFloat(data[i][8])
		                ]);
		volumeArray.push({
			x:parseInt(data[i][0]), // the date
			y:parseFloat(data[i][10]), // 成交量
			color: parseFloat(data[i][1]) < parseFloat(data[i][2]) ? '#DD2200':'#33AA11'  //柱状图颜色
		});
		amountArray.push([
		                  parseInt(data[i][0]),
		                  parseFloat(data[i][11])
		                  ]);
	}
	index = ohlcArray.length-1;
	//开始绘图
	return new Highcharts.StockChart( {
		chart:{
			renderTo : divID,
			/*margin: [6,0,32,60],*/
			plotBorderColor: '#3C94C4',
			plotBorderWidth: 0.3,
			events: {				//屏幕显示范围控制，控制在60根烛线，startTime和endTime分别为第一根和最后一根烛线毫秒值
				load: function () {
					var chart = $('#zyh').highcharts();
					chart.xAxis[0].setExtremes(result.startTime,result.endTime);
				}
			}
		},
		loading: {
			labelStyle: {
				position: 'relative',
				top: '10em',
				zindex:1000
			}
		},
		credits:{
			enabled:false
		},
		rangeSelector: {
			enabled:false,
			inputDateFormat: '%Y-%m-%d'  //设置右上角的日期格式
		},
		plotOptions: {
			//修改蜡烛颜色
			candlestick: {
				color: '#33AA11',
				upColor: '#DD2200',
				lineColor: '#33AA11',
				upLineColor: '#DD2200',
				maker:{
					states:{
						hover:{
							enabled:false,
						}
					}
				}
			},
			//去掉曲线和蜡烛上的hover事件
			series: {
				states: {
					hover: {
						enabled: false
					}
				},
				line: {
					marker: {
						enabled: false
					}
				}
			}
		},
		//格式化悬浮框
		tooltip: {
			enabled: true,
			borderColor: '#DD2200',
			borderWidth: 1,
			formatter: function() {
				if(this.y == undefined){
					return;
				}
				for(var i =0;i<data.length;i++){
					if(this.x == data[i][0]){
						avl = parseFloat(data[i][9]);
					}
				}
				y = (this.points[0].point.y*0.0001).toFixed(2);
				amount = (this.points[1].point.y*0.0001).toFixed(2);
				MA5 =this.points[2].y;
				MA10 =this.points[3].y;
				MA20 =this.points[4].y;
				MA30 =this.points[5].y;
				open = this.points[6].point.open;
				high = this.points[6].point.high;
				low = this.points[6].point.low;
				close = this.points[6].point.close;
				var stockName = this.points[6].series.name;
				var tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d  %A', this.x) +'</b><br/>';
				tip +=stockName+"<br/>";
				if(open>avl){
					tip += '开盘价：<span style="color: #DD2200;">'+open+' </span><br/>';
				}else{
					tip += '开盘价：<span style="color: #33AA11;">'+open+' </span><br/>';
				}
				if(high>avl){
					tip += '最高价：<span style="color: #DD2200;">'+high+' </span><br/>';
				}else{
					tip += '最高价：<span style="color: #33AA11;">'+high+' </span><br/>';
				}
				if(low>avl){
					tip += '最低价：<span style="color: #DD2200;">'+low+' </span><br/>';
				}else{
					tip += '最低价：<span style="color: #33AA11;">'+low+' </span><br/>';
				}
				if(close>avl){
					tip += '收盘价：<span style="color: #DD2200;">'+close+' </span><br/>';
				}else{
					tip += '收盘价：<span style="color: #33AA11;">'+close+' </span><br/>';
				}
				if(y>100000000){
					tip += "成交量："+(y*0.00000001).toFixed(2)+"(万亿手)<br/>";
				}else if(y>10000 && y<100000000){
					tip += "成交量："+(y*0.0001).toFixed(2)+"(亿手)<br/>";
				}else{
					tip += "成交量："+y+"(万手)<br/>";
				}
				if(amount>100000000){
					tip += "成交额："+(amount*0.00000001).toFixed(2)+"(万亿元)<br/>";
				}else if(amount>10000 && amount<100000000){
					tip += "成交额："+(amount*0.0001).toFixed(2)+"(亿元)<br/>";
				}else{
					tip += "成交量："+amount+"(万元)<br/>";
				}
				$reporting.html(				//顶部数据提示
						'   &emsp;&emsp;&emsp;'
//						+'	<span style="font-weight:bold;font-size:6px">'+stockName+'</span>'
						+'  <span style="font-size:4px">'+Highcharts.dateFormat(format,this.x)+'</span>'
						+'	<span style="color:#273895;font-size:4px">MA5</span> <span style="font-size:4px">'+ MA5+'</span>'
						+'	<span style="color:#f3b675;font-size:4px">MA10</span> <span style="font-size:4px">'+ MA10+'</span>'
						+'	<span style="color:#ff00ff;font-size:4px">MA20</span> <span style="font-size:4px">'+ MA20+'</span>'
						+'	<span style="color:#2ca7b4;font-size:4px">MA30</span> <span style="font-size:4px">'+ MA30+'</span>'
				);
				return tip;
			},
			crosshairs:	[true, true],
			borderColor:	'white',
			shadow: false
		},
		title: {
			enabled:false
		},
		exporting: {
			enabled: false  //设置导出按钮不可用
		},
		scrollbar: {
			enabled: false
		},
		navigator: {
			adaptToUpdatedData: false,
			xAxis: {
				labels: {
					formatter: function(e) {
						return Highcharts.dateFormat('%m-%d', this.value);
					}
				}
			},
			handles: {
				backgroundColor: '#808080'
			},
			outlineColor: "#35709c",
			outlineWidth: 0.3,
			margin:-16	//导航偏移量
		},
		/*xAxis: {
			labels: {
				formatter: function(e) {
					return Highcharts.dateFormat('<span style="font-size:4px">%m-%d</span>', this.value);
				}
			} ,
			type: 'datetime',
			tickLength: 0,//X轴下标长度
			lineWidth: 0,//X轴线宽度
			offset: -167,
//			gridLineColor: '#424141', //X轴网格线
//			gridLineWidth: 0.1
			//minRange: 3600 * 1000*24*7// X轴显示的最小范围，导航的缩放不能小于这个范围
		},*/
		yAxis: [
		        {
		        	title: {
		        		enable:false
		        	},
		        	labels: {
//		        		style:{"color":"black"},
		        		x: -3
		        	},
		        	height: '55%',
		        	lineWidth:0,//Y轴边缘线条粗细
		        	gridLineColor: '#424141',
		        	gridLineWidth:0.1,
		        	// gridLineDashStyle: 'longdash',
		        	opposite:false
		        },{
		        	title: {
		        		enable:false
		        	},
		        	labels: {
		        		x: 28,
		        		y: 8,
//		        		style:{"color":"black"},
		        		formatter:function(){
		        			if(this.value > 10000 && this.value < 100000000) {
		        				return (this.value*0.0001).toFixed(0)+"万";
		        			}else if(this.value > 100000000 && this.value < 1000000000000){
		        				return (this.value*0.00000001).toFixed(0)+"亿"; 
		        			}else if(this.value > 1000000000000){
		        				return (this.value*0.000000000001).toFixed(0)+"万亿"; 
		        			}else if(this.value < 10000 && this.value >= 0){
		        				return this.value.toFixed(0); 
		        			}

		        			if(this.value < -10000 && this.value > -100000000) {
		        				return (this.value*0.0001).toFixed(0)+"万";
		        			}else if(this.value < -100000000 && this.value > -1000000000000){
		        				return (this.value*0.00000001).toFixed(0)+"亿"; 
		        			}else if(this.value < -1000000000000){
		        				return (this.value*0.000000000001).toFixed(0)+"万亿"; 
		        			}else if(this.value < 0 && this.value > -10000){
		        				return this.value.toFixed(0); 
		        			}

		        		}
		        	},
		        	crosshair: {color:'white'},
		        	top: '60%',
		        	height: '25%',
		        	gridLineColor: '#346691',
		        	gridLineWidth:0.1,
		        	lineWidth:0,
		        	opposite:false,
		        	showFirstLabel: true,
		        	showLastLabel: true,
		        },{
		        	title: {
		        		enable:false
		        	},
		        	labels: {
		        		x: 38,
		        		y: 12,
//		        		style:{"color":"black"},
		        		formatter:function(){
		        			if(this.value > 10000 && this.value < 100000000) {
		        				return (this.value*0.0001).toFixed(0)+"万";
		        			}else if(this.value > 100000000 && this.value < 1000000000000){
		        				return (this.value*0.00000001).toFixed(0)+"亿"; 
		        			}else if(this.value > 1000000000000){
		        				return (this.value*0.000000000001).toFixed(0)+"万亿"; 
		        			}else{
		        				return this.value.toFixed(0); 
		        			}
		        		}
		        	},
		        	crosshair: {color:'white'},
		        	top: '88%',
		        	height: '12%',
		        	gridLineColor: '#346691',
		        	gridLineWidth:0.1,
		        	lineWidth:0,
		        	opposite:false,
		        	showFirstLabel: true,
		        	showLastLabel: true,
		        }],
		        series: [
		                 {
		                	 type: 'column',//2
		                	 name: '成交量',
		                	 data: volumeArray,
		                	 yAxis: 1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'spline',
		                	 name: '成交额',
		                	 color:'#ff00ff',
		                	 data: amountArray,
		                	 yAxis: 2,
		                	 lineWidth:1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'spline',
		                	 name: 'MA5',
		                	 color:'#273895',
		                	 data: MA5Array,
		                	 lineWidth:1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'spline',
		                	 name: 'MA10',
		                	 data: MA10Array,
		                	 color:'#f3b675',
		                	 threshold: null,
		                	 lineWidth:1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'spline',
		                	 name: 'MA20',
		                	 data: MA20Array,
		                	 color:'#ff00ff',
		                	 threshold: null,
		                	 lineWidth:1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'spline',
		                	 name: 'MA30',
		                	 data: MA30Array,
		                	 color:'#2ca7b4',
		                	 threshold: null,
		                	 lineWidth:1,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 },
		                 {
		                	 type: 'candlestick',
		                	 id:"candlestick",
		                	 name: '宗易汇邮币卡指数',
		                	 data: ohlcArray,
		                	 dataGrouping: {
		                		 enabled: false
		                	 }
		                 }
		                 ],
		                 //版权信息
		                 credits: {
		                	 text: 'GNNT',
		                	 href: 'http://www.gnnt.com.cn'
		                 }
	});
}

/*var flag = false;
var time;
//var time = 1472541000000;
if(type==5 ||type==15 ||type==30 ||type==60)
	setInterval(function () {
		$.ajax({
			url: url,
			data: {"timer":1,"code":code,"industryid":industryid,type:type,"lastTime": str},
			type: 'post',
			success: function(data){
				var klDatas=[],klData=[];
				data = JSON.parse(data);
				klDatas = data.data.split("~");
				for(i=0;i<klDatas.length-1;i++){
					klData[i] = klDatas[i].split("^");
				}
				var chart = $('#zyh').highcharts();
				if(flag){	//定时器重复更新
					for(var i=0;i<8;i++)
						chart.series[i].removePoint(index+1);
				}else{		//定时器第一次更新
					for(var i=0;i<8;i++){
						chart.series[i].removePoint(index);
					}
				}
				console.log("---定时器启动更新数据---");
				console.log(data);
				for(i=0;i<klData.length;i++){
					time = parseInt(klData[i][0]);
//					time +=300000;
					console.log(time);
					console.log(new Date(time));
					chart.series[0].addPoint({x:time,y:parseFloat(klData[i][10]),color:parseFloat(klData[i][1]) > parseFloat(klData[i][2]) ? '#DD2200':'#33AA11'}); //成交量
					chart.series[1].addPoint([time,parseFloat(klData[i][11])]);				   		//成交额
					chart.series[2].addPoint([time,parseFloat(klData[i][5])]);				   		//MA5
					chart.series[3].addPoint([time,parseFloat(klData[i][6])]);				   		//MA10
					chart.series[4].addPoint([time,parseFloat(klData[i][7])]);				   		//MA20
					chart.series[5].addPoint([time,parseFloat(klData[i][8])]);				   		//MA30
					chart.series[6].addPoint([time,parseFloat(klData[i][1]),parseFloat(klData[i][3]),parseFloat(klData[i][4]),parseFloat(klData[i][2])]);  //K
				}
				flag = true;
			}
		});
	},type*60*1000);*/


//模拟数据调用
var result = {
		'data' : '1472700300000^1075.95^1075.96^1075.96^1075.95^1075.93^1076^1079.83^1079.34^1075.9533^10478^469865.76~1472700600000^1075.98^1075.96^1075.98^1075.96^1075.93^1076^1079.83^1079.34^1075.97^47407661^6188644158.98~1472707800000^1075.63^1074.59^1075.87^1073.39^1075.65^1075.87^1079.76^1079.3^1075.0114^57373252^7168634977.06~1472708100000^1074.54^1074.54^1074.54^1074.54^1075.36^1075.57^1079.56^1079.14^1074.54^60942044^7524166797.48~1472708400000^1074.16^1074.09^1074.16^1074.09^1074.96^1075.37^1078.98^1078.98^1074.1267^19103^2509422.79~1472708700000^1073.78^1073.74^1073.79^1073.69^1074.56^1075.18^1078.4^1078.8^1073.75^64707427^8015208802.72~1472709000000^1073.85^1073.85^1073.85^1073.85^1074.16^1075.06^1077.83^1078.62^1073.85^66656796^8196998140.99~1472709300000^1076.81^1076.81^1076.81^1076.81^1074.61^1075.13^1077.41^1078.54^1076.81^68839996^8370173147.7~1472709600000^1076.82^1076.84^1076.84^1076.82^1075.07^1075.21^1076.99^1078.45^1076.8267^27122^3025220.27~1472709900000^1078.65^1078.61^1078.65^1078.61^1075.97^1075.46^1076.66^1078.42^1078.642^72600774^8687625462.09~1472710200000^1078.38^1078.39^1078.46^1078.38^1076.9^1075.73^1076.31^1078.37^1078.424^74194400^8845121113.08~1472710500000^1078.05^1077.97^1078.06^1077.83^1077.72^1075.94^1075.94^1078.54^1077.9362^156806^12969378.01~1472710800000^1078.07^1078.39^1078.39^1078.07^1078.04^1076.32^1076.09^1078.62^1078.3^51285^3036012.61~1472711100000^1077.71^1077.74^1077.74^1077.71^1078.22^1076.64^1076.11^1078.59^1077.72^19944^2943375.3~1472711400000^1077.38^1077.35^1077.38^1077.35^1077.97^1076.97^1076.17^1078.31^1077.365^80396039^9424306662.93~1472711700000^1077.53^1077.55^1077.55^1077.53^1077.8^1077.35^1076.26^1078.05^1077.5433^81984244^9578576843.49~1472712000000^1077.58^1077.73^1077.73^1077.58^1077.75^1077.74^1076.4^1077.8^1077.658^83482585^9717106545.73~1472712300000^1077.59^1077.53^1077.6^1077.53^1077.71^1077.72^1076.39^1077.79^1077.5733^11557^2818088.6~1472712600000^1076.73^1076.68^1076.73^1076.64^1077.54^1077.63^1076.35^1077.76^1076.69^86281126^10001292795.49~1472712900000^1081.89^1081.84^1081.89^1081.84^1078.23^1078.14^1076.63^1077.65^1081.865^88616064^10214442836.75~1472713200000^1082.11^1082.11^1082.11^1082.11^1079.11^1078.66^1076.94^1077.55^1082.11^1660^549020.66~1472713500000^1081.95^1081.94^1081.95^1081.94^1080.02^1079^1077.23^1077.44^1081.945^88885237^10270146338.61~1472713800000^1082.05^1082.05^1082.05^1082.05^1080.92^1079.36^1077.54^1077.33^1082.05^197^25528.78~1472714100000^1081.8^1081.78^1081.8^1081.78^1081.94^1079.74^1077.84^1077.21^1081.79^89153089^10344135957.62~1472714400000^1081.75^1081.74^1081.75^1081.74^1081.94^1079.74^1077.84^1077.21^1081.7467^3542^540806.45~1472714700000^1082.16^1082.41^1082.41^1082.16^1082.07^1079.81^1077.87^1077.23^1082.3267^89478727^10426176163.7~1472720100000^1082.48^1082.49^1082.49^1082.48^1082.49^1082.49^1082.49^1082.49^1082.4802^1249^1069780.27~1472779800000^1073.26^1072.94^1073.28^1072.87^1080.27^1080.6^1079.2^1077.84^1073.0631578947366^412905^2.8906816170000434e7~1472780100000^1072.11^1072.05^1072.11^1072.05^1078.33^1080.14^1078.96^1077.72^1072.074^6681584^1.0444191803300004e9~1472780400000^1071.05^1071.05^1071.05^1071.05^1071.07^1071.12^1071.23^1071.46^1071.05^0^0.0~1472780700000^1070.39^1070.35^1070.39^1070.35^1075.85^1078.89^1078.5^1077.5^1070.37^11401368^1.8354045512599993e9~1472781000000^1070.07^1070.05^1070.07^1070.03^1073.38^1077.68^1078.08^1077.3^1070.0625^12323^2548343.1599986553~1472781300000^1070.38^1070.38^1070.38^1070.38^1070.95^1076.52^1077.71^1077.12^1070.38^15929209^2.327357534010005e9~1472781600000^1073.71^1073.58^1073.71^1073.58^1071.08^1075.68^1077.46^1077.08^1073.645^18367713^2.5417112919600067e9~1472781900000^1071.92^1071.93^1071.93^1071.92^1070.75^1075.51^1077.38^1077.03^1071.9250000000002^20253331^2.7713221152900033e9~1472782200000^1070.95^1070.88^1070.95^1070.88^1070.72^1074.42^1077.04^1076.91^1070.915^22373083^2.9926464902200017e9~1472782500000^1070.38^1070.41^1070.41^1070.35^1070.73^1073.29^1076.69^1076.78^1070.3787499999999^24603186^3.247433716300002e9~1472782800000^1068.77^1068.71^1068.77^1068.71^1070.46^1071.92^1076.25^1076.62^1068.74^26783224^3.451290440330003e9~1472783100000^1068.5^1068.49^1068.5^1068.49^1070.08^1070.52^1075.79^1076.44^1068.4966666666667^7771^1608980.5000009537~1472783400000^1068.25^1068.21^1068.25^1068.19^1070.03^1070.49^1075.77^1076.43^1068.2175000000002^30445720^3.8690848298899975e9~1472783700000^1068.2^1068.14^1068.2^1068.11^1070.01^1070.48^1075.77^1076.43^1068.15625^32327660^4.069415552470004e9~1472784000000^1068.58^1068.55^1068.58^1068.55^1069.34^1070.04^1075.32^1076.15^1068.565^34374382^4.330567371759987e9~1472784300000^1068.22^1068.22^1068.22^1068.22^1068.23^1068.19^1068.16^1068.17^1068.22^0^0.0~1472784600000^1068.1^1068.13^1068.13^1068.1^1068.35^1069.54^1074.21^1075.51^1068.1174999999998^37667935^4.700326731559997e9~1472784900000^1068.1^1068.02^1068.12^1068.02^1068.21^1069.34^1073.51^1075.17^1068.08^19802^2507629.700000763~1472785200000^1067.55^1067.55^1067.55^1067.55^1067.56^1067.55^1067.55^1067.58^1067.55^0^0.0~1472785500000^1067.29^1067.3^1067.3^1067.28^1067.95^1068.98^1072.75^1074.8^1067.29^17342^3936087.5500011444~1472785800000^1066.83^1066.83^1066.83^1066.83^1066.86^1066.87^1066.87^1066.89^1066.83^0^0.0~1472786100000^1066.52^1066.57^1066.57^1066.52^1067.46^1068.4^1071.96^1074.39^1066.5575^217^7500.159999847412~1472786400000^1066.39^1066.41^1066.41^1066.38^1067.1^1067.95^1071.19^1074.01^1066.392^47206302^5.844709709089996e9~1472786700000^1066.92^1066.92^1066.92^1066.92^1066.92^1066.92^1066.92^1066.93^1066.92^0^0.0~1472787000000^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^0^0.0~1472787300000^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^0^0.0~1472787600000^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^1066.94^0^0.0~1472794200000^1068.04^1068.47^1068.58^1068.04^1067.51^1068.16^1071.29^1074.08^1068.4334112149522^58005117^7.253689364580009e9~1472794500000^1067.82^1067.82^1067.82^1067.82^1067.84^1067.86^1067.86^1067.87^1067.82^0^0.0~1472794800000^1068.19^1068.2^1068.2^1068.19^1067.58^1067.85^1069.88^1073.45^1068.1933333333334^5733^1241226.810002327~1472795100000^1068.44^1068.44^1068.44^1068.44^1068.44^1068.44^1068.44^1068.41^1068.44^0^0.0~1472795400000^1068.71^1068.7^1068.71^1068.7^1068.33^1067.89^1068.97^1072.85^1068.7033333333331^12580^1273535.309996605~1472795700000^1067.64^1067.64^1067.64^1067.64^1068.11^1067.79^1068.92^1072.81^1067.64^67495081^8.5231678135999975e9~1472796000000^1068.59^1068.59^1068.59^1068.59^1068.59^1068.59^1068.23^1068.03^1068.59^0^0.0~'
};
$(function() {
	new highStockChart('zyh', result);
});



