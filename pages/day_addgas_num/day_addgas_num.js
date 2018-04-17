// 需要数据该车的加油数
// 数据库里加油0次车辆数
// 加油1次车辆数
// 加油2次车辆数

var wxCharts = require('../../dist/wxcharts.js');
var app = getApp();
var ringChart = null;
Page({
  data: {
    gascount:0,
    carid: {
      carid: wx.getStorageSync('carid')
    }   
  },
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  updateData: function () {
    var that=this;
    ringChart.updateData({
      title: {
        name: that.data.gascount
      },
      subtitle: {
        color: '#ff0000'
      }
    });
  },
  onShow:function(e){
    console.log("onShow");
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    // wx.request({
    //   url: "https://rosemary1997.cn/ForTaxiers/Gad",
    //   data: { carid: wx.getStorageSync('carid') },
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       'gascount': res.data.data
    //     })
    //     console.log(that.data.gascount)
    //     console.log("aaa"+res.data.data)
    //   }
      
    // })

    console.log("PPPP"+that.data.gascount);


  },
  onLoad: function (e) {
    console.log("areaonLoad");
    },
  onReady: function (e) {
    console.log("onReady");


    var that = this;
    wx.request({
      url: "https://rosemary1997.cn/ForTaxiers/Gad",
      data: { carid: wx.getStorageSync('carid') },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          'gascount': res.data.data
        })
        console.log(that.data.gascount)
        console.log("aaa" + res.data.data)

        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
          animation: true,
          canvasId: 'ringCanvas',
          type: 'ring',
          extra: {
            ringWidth: 25
          },
          title: {
            name: that.data.gascount,
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '今日加油',
            color: '#666666',
            fontSize: 15
          },
          series: [{
            name: '0次',
            data: 2420,
            stroke: false
          }, {
            name: '1次',
            data: 2794,
            stroke: false
          }, {
            name: '2次及以上',
            data: 2878,
            stroke: false
          }],
          disablePieStroke: true,
          width: windowWidth,
          height: 230,
          dataLabel: false,
          legend: false,
          padding: 200,
        });
        ringChart.addEventListener('renderComplete', () => {
          console.log('renderComplete');
        });
        setTimeout(() => {
          ringChart.stopAnimation();
        }, 500);



      }

    })
  }
});