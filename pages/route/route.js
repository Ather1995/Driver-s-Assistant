// route.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();
var lonlat;
var city;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: {},
    source1:[
      {
        src:'../../resource/images/wc.png',
        content:'厕所'
      },
      {
        src: '../../resource/images/gas.png',
        content: '加油站'
      }
    ],
    source2: [
      {
        src: '../../resource/images/park.png',
        content: '停车场'
      },
      {
        src: '../../resource/images/restaurant.png',
        content: '餐厅'
      }
    ],
    hissearch: [
      {
        content: wx.getStorageSync("00")
      },
      {
        content: wx.getStorageSync("01")
      },
      {
        content: wx.getStorageSync("02")
      }
    ],
    //轮播
    imgUrls: [
      'http://139.199.85.13:8080/Images/1.jpg',
      'http://139.199.85.13:8080/Images/2.jpg',
      'http://139.199.85.13:8080/Images/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: true
  },
  loadingTap: function () {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      });
      that.update();
    }, 3000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  mysearch:function(e){
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
     var key = config.Config.key;
     that.loadingTap();
    if(index==0)
    {
      var keywords='公共厕所';
    }
    else if(index==1){
      var keywords = '中国石油加油站';
    }
    else if (index == 2)
    {
      var keywords = '停车场';
    } else if (index == 3) {
      var keywords = '面馆';
    }
    var url = '../poi/poi?keywords=' + keywords;
    wx.navigateTo({
      url: url,
    })
  },
  mysearch2: function (e) {
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
    var key = config.Config.key;
    if (index == 0) {
      var keywords = '停车场';
    }
    else if (index == 1) {
      var keywords = '面馆';
    }
    var url = '../poi/poi?keywords=' + keywords;
    wx.navigateTo({
      url: url,
    })
  },
  hissearch: function (e){
    var keywords = wx.getStorageSync("00");
    var url = '../poi/poi?keywords=' + keywords;
    wx.navigateTo({
      url: url,
    })
  },
  clearhis:function(e){
    wx.removeStorageSync("00");
    wx.removeStorageSync("01");
    wx.removeStorageSync("02");
    console.log("remove");
  },

  showMap: function (e) {
    console.log("showMap0"); 
    
    // var index = e.target['dataset'].index;
    var index = e.target.dataset.index;
    console.log("showMap"); 
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 14
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow"); 
    var that =this;
    that.setData({
      "hissearch[0].content": wx.getStorageSync("00"),
      "hissearch[1].content": wx.getStorageSync("01"),
      "hissearch[2].content": wx.getStorageSync("02")
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})