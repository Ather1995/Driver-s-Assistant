var app = getApp();
Page({
  data: {
    userInfo: {},
    carid:'未认证',
    // src: '../../resource/images/logo.png',
    source: [
      {
        imgsrc: '../../resource/images/clientnum.png',
        content: '载客量'
      },
      {
        imgsrc: '../../resource/images/addgas.png',
        content: '加油数'
      },
      {
        imgsrc: '../../resource/images/activezone.png',
        content: '活动区'
      },
      {
        imgsrc: '../../resource/images/longdistancenum.png',
        content: '载客榜'
      }
    ]
  },
  //换头像接口
  bindButtonTap: function () {
    
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  onShow: function () {
    var that = this;
      that.setData({
          carid: wx.getStorageSync('carid')
      })
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo;
          that.setData({
            userInfo: {
              avatar: userInfo.avatarUrl,
              nickname: userInfo.nickName
            }
          })
        },
        fail: function (err) { }
      });
      if(that.data.carid=='')
      {
        that.setData({
          carid: "未认证"
        })
      }
  },

  // 跳转日统计量的界面
  daystatis: function (e) {
    console.log("daystatis");
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
    
    if (index == 0) {
      wx.navigateTo({
        url: '../day_client_num/day_client_num'
      })
      console.log("datstatis" + index);
    }
    else if (index == 1) {
      wx.navigateTo({
        url: '../day_addgas_num/day_addgas_num',
      })
    }
    else if (index == 2) {
      wx.navigateTo({
        url: '../day_active_area/day_active_area',
      })
    }
    else if (index == 3) {
      wx.navigateTo({
        url: '../day_long_trip_num/day_long_trip_num',
      })
    }
    
  },
  // 跳转月统计量的界面
  monthstatis: function (e) {
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);

    if (index == 0) {
      wx.navigateTo({
        url: '../mon_client_num/mon_client_num'
      })
    }
    else if (index == 1) {
      wx.navigateTo({
        url: '../mon_addgas_num/mon_addgas_num',
      })
    }
    else if (index == 2) {
      wx.navigateTo({
        url: '../mon_active_area/mon_active_area',
      })
    }
    else if (index == 3) {
      wx.navigateTo({
        url: '../mon_long_trip_num/mon_long_trip_num',
      })
    }

  },
  // 实名认证按钮
  bindViewTap: function (event) {
    wx.navigateTo({
      url: '../verity/verity'
    })
  },
  // 获取用户权限
  onLoad: function () {
    var that=this;
      wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        that.setData({
          userInfo: {
            avatar: userInfo.avatarUrl,
            nickname: userInfo.nickName
          }
        })
      },
      fail: function (err) { }
    });
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
  }
})
