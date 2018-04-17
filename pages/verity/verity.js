// verity.js
// <!--
//   变量说明：
// windowHeight ：设备的窗口的高度
// windowWidth ： 设备的窗口的宽度
// idcard ： 身份证
// realname：真实姓名
// carid ：车号
// password: 密码
// subPassword ：确认密码
// -->
var util = require('../../utils/util.js');  //常用方法
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var app = getApp();
  var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        that.setData({
          userInfo: {
            avatar: userInfo.avatarUrl,
            nickname: userInfo.nickName
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
    var idcard = e.detail.value.idcard;
    var realname = e.detail.value.realname;
    var carid = e.detail.value.carid;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册

    if ("" == util.trim(idcard)) {
      util.alertViewWithCancel("提示", "身份证不能为空", function () {
        console.log(idcard);
      }, "true");
      return;
    } 
    else if(util.trim(idcard).length!=18){
      util.alertViewWithCancel("提示", "身份证应为18位", function () {
        console.log(idcard);
      }, "true");
      return;
      }else {
      util.clearError(that);
    }
    if ("" == util.trim(realname)) {
      // util.isError("真实姓名不能为空", that);
      util.alertViewWithCancel("提示", "真实姓名不能为空", function () {
        console.log(realname);
      }, "true");
      return;
    } else {
      util.clearError(that);
    }
    if ("" == util.trim(carid)) {
      // util.isError("车牌号不能为空", that);
      util.alertViewWithCancel("提示", "车牌号不能为空", function () {
       
      }, "true");
      return;
    } else {
      util.clearError(that);
    }
    
    wx.request({
      url: "https://rosemary1997.cn/ForTaxiers/Verity",
      //https://rosemary1997.cn   115.159.100.103   now:139.199.85.13
      //url: "https://rosemary1997.cn/ForTaxiers/DailyLoadServlet",
      data: {carid:carid},

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 设置请求的 header
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // that.setData({
        //   'series':res.data.series,
        // }) 
        console.log("aaaaa");
        console.log(res)
        if (res.statusCode==500)
        {
          wx.showModal({
            title: '认证状态',
            content: '认证失败！',
          })
        }
        else{
          if (res.data.property.res == '0') {
            wx.showModal({
              title: '认证状态',
              content: '认证成功！',
              success: function (res) {
                  if (res.confirm) {
                    wx.setStorageSync('carid', carid);
                    wx.navigateBack();
                  }
              }
            })
          }
          else {
            wx.showModal({
              title: '认证状态',
              content: '认证失败！',
            })
          }

        }
        
      }
    })

    
    // //测试
    // wx.showModal({
    //       title: '认证状态',
    //       content: '认证成功！',
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.setStorageSync('carid', carid);
    //           wx.navigateBack();
    //         }
    //       }
    //     })
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