// 柱状图的数据接口未做好，但合计：10接口做好
// 需要数据：day_client_num（合计）
// 柱状图：母图：时间段'0-4', '4-8', '8-12', '12-16', '16-20', '20-24'的六个数据
// 子图（点击相应数轴详细时刻的数据（感觉高大上一点，实在没时间查出来，就我们自己生成一下把？）如：0：00 - 4：00载客量有['0-1', '1-2', '2-3', '3-4']）
var wxCharts = require('../../dist/wxcharts.js');
var app = getApp();
var columnChart = null;

var chartData = {
    main: {
        title: '日载客量统计',
        data: [9,1,7,7,9,9],//具体数据
        categories: ['0-4', '4-8', '8-12', '12-16','16-20', '20-24']//横轴
    },
    sub: [{
      title: '0：00-4：00载客量',
        data: [5, 1, 0, 3],
        categories: ['0-1', '1-2', '2-3', '3-4']
    }, {
        title: '4：00-8：00载客量',
        data: [0, 0, 0, 1],
        categories: ['4-5', '5-6', '6-7', '7-8']
    }, 
    {
      title: '8：00-12：00载客量',
      data: [2, 1, 3, 0],
      categories: ['8-9', '9-10', '10-11', '11-12']
    }, 
    {
      title: '12：00-16：00载客量',
      data: [1, 1, 4, 1],
      categories: ['12-13', '13-14', '14-15', '15-16']
    }, {
      title: '16：00-20：00载客量',
        data: [3, 4, 1, 1],
        categories: ['16-17', '17-18', '18-19', '19-20']                
    }, {
      title: '20：00-24：00载客量',
        data: [10,4,5,9],
        categories: ['20-21', '21-22', '22-23', '23-24']
    }]
};
Page({
    data: {
      carid: {
        carid: wx.getStorageSync('carid')
      },
        day_client_num: 42,
        chartTitle: '日载客量统计',
        isMainChartDisplay: true,
        data:[9, 1, 7, 7, 9, 9]
    },
    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
              name: '日载客量统计',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(0) + '人';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,//设置子标题
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                  name: '时间段',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                      return val.toFixed(0) + '人';
                    }
                }]
            });

        }
    },
    onShow:function(e){
      var that = this;

      wx.request({
        url: 'https://rosemary1997.cn/ForTaxiers/DailyLoadServlet', ///服务器访问的
        method: 'POST',
        data: {
          carid: wx.getStorageSync("carid")
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)//调试用
          that.setData({
            'day_client_num': res.data.sum,
            "data[0]": res.data.data[0],
            "data[1]": res.data.data[1],
            "data[2]": res.data.data[2],
            "data[3]": res.data.data[3],
            "data[4]": res.data.data[4],
            "data[5]": res.data.data[5]
          })

        }
      })
    },
    onLoad: function (options) {
      console.log("onLoad");
      
    },
    onReady: function (e) {

      var that = this;
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
              name: '时间段',
                data: that.data.data,
                format: function (val, name) {
                  return val.toFixed(0) + '人';
                }
            }],
            yAxis: {
                format: function (val) {
                  return val + '人';
                },
                title: '载客量',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});
