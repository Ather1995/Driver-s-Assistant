// 已完成接口
// 需要返回数据series数组
// 在上海市的时间
// 浙江省的时间
// 江苏省的时间
// 其他的时间
var wxCharts = require('../../dist/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
    carid:{
      carid: wx.getStorageSync('carid')
    },
    series:[
      {
        name: '市中心',
        data: 0,
      }, {
        name: '宝山区',
        data: 0,
      }, {
        name: '嘉定区',
        data: 0,
      },  {
        name: '青浦区',
        data: 0,
      }, {
        name: '松江区',
        data: 0,
      },  {
        name: '金山区',
        data: 0,
      }, {
        name: '闵行区',
        data: 0,
      },
      {
        name: '奉贤区',
        data: 0,
      },
      {
        name: '崇明区',
        data: 0,
      }
    ],
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var that=this;
    var windowWidth = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }



//接口，待填,需数组series

    


      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: that.data.series,
        width: windowWidth-20,
        height: 300,
        dataLabel: true,
      });
  },
  onShow:function(e){
    var that=this;
    wx.request({
      url: "https://rosemary1997.cn/ForTaxiers/Area",
      data: {carid: wx.getStorageSync('carid')},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          "series[0].data": res.data[0].data,
          "series[1].data": res.data[1].data,
          "series[2].data": res.data[2].data,
          "series[3].data": res.data[3].data,
          "series[4].data": res.data[4].data,
          "series[5].data": res.data[5].data,
          "series[6].data": res.data[6].data,
          "series[7].data": res.data[7].data,
          "series[8].data": res.data[8].data,
        })
        console.log(res.data[0].data);
        console.log(res);
      }
    })

  }
});
