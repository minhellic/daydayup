$(function () {
    $('#line').highcharts({
    	
    	//设置标题
        title: {
            text: '月平均温度', //标题的文字
            align: 'center', //文字水平对齐方式，有left、center、right可选，默认为center
            //verticalAlign: 'top',   //文字垂直对齐方式，有top、middle、bottom可选，默认为''
            useHTML: true, //是否解析html标签，设置解析后，可以使用例如a等html标签，默认为false
            floating: false, //是否浮动，设置浮动后，标题将不占用图表区位置，默认为false
            margin: 15, //标题和图表区的间隔，当有副标题时，表示标题和副标题之间的间隔，默认为15
            style: {  //文字样式，可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
            	fontFamily: '微软雅黑'
            },
            //x: 0, //相对于水平对齐的偏移量，可以是负数，单位是px，默认为0
            //y: 0 //相对于垂直对齐的偏移量，可以使负数，单位是px，默认为0
        },
        
        //设置副标题，与标题的属性设置一样
        subtitle: {
            text: 'Source: WorldClimate.com',
            //x: -20
            align: 'center'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{ //在y轴值为21处画一根1px的red颜色的线
                value: 21,
                width: 1,
                color: 'red'
            }]
        },
        
        //提示框配置
        tooltip: { 
            valueSuffix: '°C', //提示框后缀
            shared: true  //提示框将x轴相同的值合并
        },
        
        //图例配置
        legend: {
            //layout: 'vertical', //图例数据项的布局。布局类型：水平或垂直。默认是：水平 默认值：horizontal.
            //align: 'right', //图例容器（中的图例）水平对齐在图表区，合法值有"left", "center" 和 "right". 默认是： center. 默认值：center.
            //verticalAlign: 'middle',//垂直对齐。能取"top", "middle" or "bottom"之一。垂直对齐的位置可通过Y设置进一步调整它的位置。 默认值：bottom.
            borderWidth: 0
        },
        
        //区域配置
        plotOptions: {
            line: {
                dataLabels: { //显示数据点值
                    enabled: true
                }
            }
        },
        
        //数据列是一个数组
        series: [{
            name: 'Berlin',
            //data是数据，可以是单一的数字，也可以是一个json对象
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, {
                y: 26.5,
                marker: {
                    symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
                }
            }, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [{
                y: 3.9,
                marker: {
                    symbol: 'url(http://www.highcharts.com/demo/gfx/snow.png)'
                }
            }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }],
        
        //版权信息
        credits: {
        	text: 'GNNT',
        	href: 'http://www.gnnt.com.cn'
        }
    });
});
