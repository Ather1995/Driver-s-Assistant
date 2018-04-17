
var app = getApp();
Page({
    data: {
      userInfo: {}, 
      myrank:'',
      my_client_num: 45,
      carid: {
        carid: wx.getStorageSync('carid')
      },
      rank: [
        {
          carid: 10897,
          clientnum: 141
        },
        {
          carid: 10105,
          clientnum: 126
        },
        {
          carid: 20714,
          clientnum: 125
        },
      {
        carid: 20943,
        clientnum: 114
      },
      {
        carid: 26908,
        clientnum: 105
      },
      {
        carid: 20932,
        clientnum: 99
      },
      {
        carid: 16179,
        clientnum: 91
      },
      {
        carid: 15500,
        clientnum: 90
      },
      {
        carid: 20890,
        clientnum: 85
      },
      {
        carid: 20146,
        clientnum: 82
      }, {
        carid: 29,
        clientnum: 77
      },
      {
        carid: 13318,
        clientnum: 73
      },
      {
        carid: 15249,
        clientnum: 68
      },
      {
        carid: 27479,
        clientnum: 65
      },
      {
        carid: 18346,
        clientnum: 64
      },
      {
        carid: 26189,
        clientnum: 64
      },
      {
        carid: 18309,
        clientnum: 64
      },
      {
        carid: 27717,
        clientnum: 64
      },
      {
        carid: 23339,
        clientnum: 63
      },
      {
        carid: 26337,
        clientnum: 63
      }
      ]
    },
    onShow: function (e){
      var that = this; 
      // 设置头像
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
      if (that.data.carid == '') {
        that.setData({
          carid: null,
        })
      }


      wx.request({
        url: "https://rosemary1997.cn/ForTaxiers/Loadsum",
        data: {carid: wx.getStorageSync('carid')},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            myrank: res.data.data,
            my_client_num: res.data.client_num,
          })
          // console.log("aaaaaaa"+res.data[0].data);
          // console.log("bbbb" + that.data.my_client_num);
        }
      })
    },
    
    onLoad: function (e) {
      // var that=this;
      // wx.request({
      //   url: "http://115.159.100.103:8080/ForTaxiers/Loadsum",
      //   data: that.data.carid,
      //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     that.setData({
      //       myrank:res.data.data
      //     })
      //     console.log(res.data[0].data);
      //   }
      // })
        }
    
});