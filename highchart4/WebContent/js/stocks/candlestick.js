$(function () {
    $.getJSON('http://www.hcharts.cn/datas/jsonp.php?a=e&filename=aapl-ohlc.json&callback=?', function (data) {
        // create the chart
        $('#candlestick').highcharts('StockChart', {
            rangeSelector : {
                selected : 1
            },
            title : {
                text : 'AAPL Stock Price'
            },
            series : [{
                type : 'candlestick',
                name : 'AAPL Stock Price',
                data : data,
                dataGrouping : {
                    units : [
                        [
                            'week', // unit name
                            [1] // allowed multiples
                        ], [
                            'month',
                            [1, 2, 3, 4, 6]
                        ]
                    ]
                }
            }],
            
          //版权信息
            credits: {
            	text: 'GNNT',
            	href: 'http://www.gnnt.com.cn'
            }
        });
    });
});
