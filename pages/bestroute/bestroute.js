var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
Page({
  data: {
    origin: wx.getStorageSync("loclongitude") + "," + wx.getStorageSync("loclatitude"),
    destination: "",
    des_long:0,
    des_lat:0,
    markers: [],
    distance: '',
    cost: '',
    polyline: []
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
  
  onLoad: function () {
  },
  onShow: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var deslongitude=0;
    var deslatitude=0;
    var desmarker=[];
    console.log("bestonshow");


    
    
    desmarker.push({
      iconPath: "../../resource/images/mapicon_navi_s.png",
      id: 0,
      latitude: wx.getStorageSync("loclatitude"),
      longitude: wx.getStorageSync("loclongitude"),
      width: 33,
      height: 33
    });
    console.log(desmarker[0] +"desmarker");

    // 更新目的地的经纬度字符串，目的地图表的经纬度
    // 注意异步
    wx.getStorage({
      key: "deslongitude",
      success: function (res) {
        that.setData({
          destination: res.data + ",",
        })

        deslongitude = res.data;

        wx.getStorage({
          key: "deslatitude",
          success: function (res) {
            that.setData({
              destination: that.data.destination + res.data,
            })
            deslatitude = res.data
            desmarker.push({
              iconPath: "../../resource/images/mapicon_navi_e.png",
              id: 1,
              latitude: res.data,
              longitude: deslongitude,
              width: 33,
              height: 33
            })
            
            that.setData({
              markers: desmarker,
            })
            
            console.log(that.data.destination)

            myAmapFun.getDrivingRoute({
              origin: that.data.origin,
              destination: that.data.destination,
              success: function (data) {
                console.log("beatdddddmyAmapFun");
                var points = [];
                if (data.paths && data.paths[0] && data.paths[0].steps) {
                  var steps = data.paths[0].steps;
                  for (var i = 0; i < steps.length; i++) {
                    var poLen = steps[i].polyline.split(';');
                    for (var j = 0; j < poLen.length; j++) {
                      points.push({
                        longitude: parseFloat(poLen[j].split(',')[0]),
                        latitude: parseFloat(poLen[j].split(',')[1])
                      })
                    }
                  }
                }
                that.setData({
                  polyline: [{
                    points: points,
                    color: "#0091ff",
                    width: 5
                  }]
                });
                if (data.paths[0] && data.paths[0].distance) {
                  that.setData({
                    distance: data.paths[0].distance + '米'
                  });
                }
                if (data.taxi_cost) {
                  that.setData({
                    cost: '打车约' + parseInt(data.taxi_cost) + '元'
                  });
                }

              },
              fail: function (info) {

              }
            })

          }
        })

      }
    }) 
    
  }
})