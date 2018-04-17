//app.js
var util = require('utils/util.js') 
let Promise = require('./libs/ES2015ponyfill/promise').Promise
App({
  uid: 0,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.deviceInfo = this.promise.getDeviceInfo()
    //调用系统API获取设备的信息
    wx.getSystemInfo({
      success: function (res) {
        var kScreenW = res.windowWidth / 375
        var kScreenH = res.windowHeight / 603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
  },
  ajax: {
    req: util.req
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
      // 在index.js中会调用getUserInfo这个Function,回传一个function类型的参数，这个参数在app.js中就是通过cb接收的，然后typeof cb == "function" && cb(this.globalData.userInfo)这句话的意思就是先判断cb是不是function类型的，如果是就调用cb这个function传进参数。
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  promise:{
    getDeviceInfo: function () {//获取设备信息
      let promise = new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: function (res) {
            resolve(res)
          },
          fail: function () {
            reject()
          }
        })
      })
      return promise
    }
  },
  getGid:(function () {//全局唯一id
    let id = 0
    return function () {
      id++
      return id
    }
  })(),
  globalData:{
    userInfo:null
  }
})