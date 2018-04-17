var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var lonlat;
var city;
Page({
  data: {
    searchnum:0,
    tips: {}
  },
  onLoad: function (e) {
    lonlat = e.lonlat;
    city = e.city;
  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = config.Config.key;
   
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var that=this;
    var keywords = e.target.dataset.keywords;
    if (that.data.searchnum<3){
      wx.setStorageSync("0" + that.data.searchnum, keywords);
      that.setData({
        searchnum: 0
      })
      console.log(that.data.searchnum);
    }
    if (that.data.searchnum == 3){
      that.setData({
        searchnum:0
      }),
        console.log(that.data.searchnum);
    }
    var url = '../poi/poi?keywords=' + keywords;
    wx.setStorage({
      key: "isNeedParkInfo",
      data: 0
    })
    wx.redirectTo({
      url: url
    })
  }
})