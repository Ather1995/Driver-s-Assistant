var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    flag_passflow:0,
    scale:16,
    city: '',
    polyline: [],
    circles: [],
    block_detail_text:[
      {
        id:1,
        parkName: "叶家宅路停车场",
        startTime: "0:00",
        endTime:"23:59",
        forwho:"宾馆"
      }, {
        id:2,
        parkName: "叶家宅路停车场1",
        startTime: "0:00",
        endTime: "23:59",
        forwho: "宾馆"
      }, {
        id:3,
        parkName: "叶家宅路停车场2",
        startTime: "0:00",
        endTime: "23:59",
        forwho: "宾馆"
      }],
    controls: [
      {//显示客流量
        id: 1,
        position: {
          left: 330 * wx.getStorageSync("kScreenW"),
          top: 50 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/ic_passflow.png',
        clickable: true,
      },
      //显示餐厅
      {
        id: 2,
        position: {
          left: 330 * wx.getStorageSync("kScreenW"),
          top: 110 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/ic_restaurant.png',
        clickable: true,
      },
      //显示厕所
      {
        id: 3,
        position: {
          left: 330 * wx.getStorageSync("kScreenW"),
          top: 170 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/ic_wc.png',
        clickable: true,
      },
      //显示天气
      {
        id: 4,
        position: {
          left: 330 * wx.getStorageSync("kScreenW"),
          top: 230 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/ic_weather.png',
        clickable: true,
      },
      //显示下方路线
      {
        id: 5,
        position: {
          left: 120 * wx.getStorageSync("kScreenW"),
          top: 335 * wx.getStorageSync("kScreenH"),
          width: 130 * wx.getStorageSync("kScreenW"),
          height: 65 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/route.png',
        clickable: true,
      },
      {
        id: 6,
        position: {
          left: 10 * wx.getStorageSync("kScreenW"),
          top: 355 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../resource/images/ic_center.png',
        clickable: true,
      }
    ]
  },
  onReady: function (e) {
    //通过id获取map,然后创建上下文
    this.mapCtx = wx.createMapContext('map');
  },
  getUserCurrentLocation: function () {
    this.mapCtx.moveToLocation();
    this.setData({
      'scale':14
    })
  },
  bindfocus: function (e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    
    wx.navigateTo({
      url: url,
    })
  },
  controltap: function (e) {
    console.log(e)
    var that = this;
    var id = e.controlId;
    if (id == 6) {
      定位当前位置
      
      that.getUserCurrentLocation()
    } else if (id == 1) {
      //显示客流量
    
      


      console.log(that.data.flag_passflow);
      if (that.data.flag_passflow == 0) {
        console.log("that.flag_passflow == 0");

        // that.setData({
        //   circles: [{
        //     latitude: '31.217372',
        //     longitude: '121.40683',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.214327',
        //     longitude: '121.404362',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.212337',
        //     longitude: '121.403503',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.21214',
        //     longitude: '121.395958',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.239303',
        //     longitude: '121.420018',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.209592',
        //     longitude: '121.39584',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.210875',
        //     longitude: '121.41596',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.206957',
        //     longitude: '121.405565',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.206942',
        //     longitude: '121.412005',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.204872',
        //     longitude: '121.40777',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.204555',
        //     longitude: '121.394842',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.216853',
        //     longitude: '121.428587',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.202445',
        //     longitude: '121.395735',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.205277',
        //     longitude: '121.386738',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.212857',
        //     longitude: '121.429617',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.201437',
        //     longitude: '121.392672',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.220775',
        //     longitude: '121.43577',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.22019',
        //     longitude: '121.43637',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.236413',
        //     longitude: '121.437435',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.23408',
        //     longitude: '121.439525',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.222655',
        //     longitude: '121.440847',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.235628',
        //     longitude: '121.440688',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.22331',
        //     longitude: '121.441867',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.197128',
        //     longitude: '121.38513',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.196678',
        //     longitude: '121.384018',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.217938',
        //     longitude: '121.443335',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.21841',
        //     longitude: '121.44468',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.226107',
        //     longitude: '121.44637',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.224747',
        //     longitude: '121.44749',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.237157',
        //     longitude: '121.447105',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.23186',
        //     longitude: '121.449707',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.231373',
        //     longitude: '121.451235',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.223055',
        //     longitude: '121.452675',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }, {
        //     latitude: '31.225638',
        //     longitude: '121.454362',
        //     color: '#7cb5ec88',
        //     fillColor: '#7cb5ec88',
        //     radius: 400,
        //     strokeWidth: 2
        //   }],
        // })
        wx.request({
          url: "https://rosemary1997.cn/ForTaxiers/LoadPoint",
          data: { 
            latitude: that.data.latitude,
            longitude: that.data.longitude,
          },

          method: 'POST',
          // 设置请求的 header
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("ddddd")
            console.log(res)
            that.setData({
              "circles": res.data.list
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        

        that.setData({
          flag_passflow: 1
        })
      } else if (that.data.flag_passflow == 1) {
        that.setData({
          flag_passflow: 0
        })
        that.setData({
          circles: []
        });
        console.log("that.flag_passflow == 1");
        console.log(that.data.circles);
      }
    } else if (id == 2) {
      // 餐厅
      wx.setStorage({
        key: 'isNeedParkInfo',
        data: 1
      })

      var keywords = '面馆';
      var url = '../poi/poi?keywords=' + keywords;
      wx.navigateTo({
        url: url,
      })
    } else if (id == 3) {

      wx.setStorage({
        key: 'isNeedParkInfo',
        data: 1
      })
      var keywords = '公共厕所';
      var url = '../poi/poi?keywords=' + keywords;
      wx.navigateTo({
        url: url,
      })
    } else if (id == 4) {
      //显示天气
      wx.navigateTo({
        url: '../weather/weather'
      })
    } else if (id == 5) {//路线
      
      wx.navigateTo({
        url: '../bestroute/bestroute'
      });
      
    }
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })

    myAmapFun.getRegeo({
      iconPath: "../../resource/images/mymarker.png",
      iconWidth: 30,
      iconHeight: 30,
      success: function (data) {
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude,
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
        wx.setStorageSync('loclatitude', data[0].latitude);
        wx.setStorageSync('loclongitude', data[0].longitude);
        console.log("loclatitude" + that.data.latitude);
        console.log("locitlongitude" + that.data.longitude);
      },
      fail: function (info) {
        wx.showModal({title:info.errMsg})
      }
    })
  }
})