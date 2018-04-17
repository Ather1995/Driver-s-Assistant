var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var key = config.Config.key;
var myAmapFun = new amapFile.AMapWX({ key: key });

var markersData = [];
Page({
  data: {
    origin: wx.getStorageSync("loclongitude") + "," + wx.getStorageSync("loclatitude"),
    destination: "",
    isdetail: false,
    isParkOrWc:false,
    iswc_markersnull:false,
    markers: [],
    wc_markers:[],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    block_detail_text: [],
    distance: '',
    cost: '',
    polyline: [],
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
  makertap: function(e) {
    var id = e.markerId;
    var that = this;

    that.loadingTap();
    that.setData({
      isdetail: true,
    });

    var selectedPoiLatitude = markersData[id].latitude;
    var selectedPoiLongitude = markersData[id].longitude;
    
    wx.getStorage({
      key: 'isNeedParkInfo',
      success: function (res) {
        console.log(res.data)
        // that.changeMarkerColor(markersData, id);
        if (res.data == 1) {
          that.showParkPoi(selectedPoiLatitude, selectedPoiLongitude, markersData, id);//显示选中poi，显示附近的停车场marker_checked
        }
        
      }
    }) 
  
    that.showMarkerInfo(markersData,id);
    // that.changeMarkerColor(markersData,id);
  },
  confirm:function(e){
    wx.navigateBack();
  },
  onLoad: function(e) {
    var that = this;
   
    console.log("myAmapFuxfvxfg");
    



    var params = {
      iconPathSelected: '../../resource/images/marker_checked.png',
      iconPath: '../../resource/images/marker.png',
      success: function(data){
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function(item,index){
        markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height,
            callout: { 
              content:"",
              color:'#FFFFFF',
              fontSize:14,
              borderRadius:10,
              bgColor: "#f24f3b",
              padding:2,
              display: 'BYCLICK'}
          })

        })
        
        if(markersData.length > 0){
          that.setData({
            markers: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData,0);

         
        }else{
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '上海市'
              });
            },
            fail: function(){
              that.setData({
                latitude: wx.getStorageSync(loclatitude)
              });
              that.setData({
                longitude: wx.getStorageSync(loclongitude)
              });
              that.setData({
                city: '上海市'
              });
            }
          })
          
          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }
        
      },
      fail: function(info){
        // wx.showModal({title:info.errMsg})
      }
    }
    if(e && e.keywords){
      params.querykeywords = e.keywords;
      if (e.keywords == "公共厕所" || e.keywords =="面馆"){
        that.setData({
          isParkOrWc:true
        })
      }else{
        that.setData({
          isParkOrWc: false
        })
      }
    }
    myAmapFun.getPoiAround(params)
  },
  bindInput: function(e){
    var that = this;
    var url = '../inputtips/input';
    if(e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city){
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  showMarkerInfo: function(data,i){
    var that = this;
    
    wx.setStorage({
      key: "deslatitude",
      data: data[i].latitude
    })
    wx.setStorage({
      key: "deslongitude",
      data: data[i].longitude
    })
    
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function(data,i){
    var that = this;
    var markers = [];
    
    
    for(var j = 0; j < data.length; j++){
      if(j==i){
        var poilongitude = data[i].longitude + ",";
        var poilonglat = poilongitude + data[i].latitude;
        console.log("1"+data[i].longitude + ",");
        console.log(poilongitude + data[i].latitude);


        myAmapFun.getWalkingRoute({
          origin: that.data.origin,
          destination: poilongitude + data[i].latitude,
          success: function (data) {
            console.log("oooosuccessbegin")
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
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.paths[0] && data.paths[0].duration) {
              that.setData({
                cost: parseInt(data.paths[0].duration / 60) + '分钟'
              });
            }

          },
          fail: function (info) {
            console.log("0000failbbbbbbbbbbbegin")
          }
        })



        // myAmapFun.getDrivingRoute({
        //   origin: '116.481028,39.989643',
        //   destination: "121.410656,31228902",
        //   success: function (data) {
        //     console.log("111ssssssmyAmapFun.getDrivingRoute");
        //     console.log(that.data.origin);
        //     var points = [];
        //     if (data.paths && data.paths[0] && data.paths[0].steps) {
        //       var steps = data.paths[0].steps;
        //       for (var i = 0; i < steps.length; i++) {
        //         var poLen = steps[i].polyline.split(';');
        //         for (var j = 0; j < poLen.length; j++) {
        //           points.push({
        //             longitude: parseFloat(poLen[j].split(',')[0]),
        //             latitude: parseFloat(poLen[j].split(',')[1])
        //           })
        //         }
        //       }
        //     }
        //     that.setData({
        //       polyline: [{
        //         points: points,
        //         color: "#0091ff",
        //         width: 5
        //       }]
        //     });
        //     if (data.paths[0] && data.paths[0].distance) {
        //       console.log("myAmapFun.getDrivingRoute");
        //       that.setData({
        //         distance: data.paths[0].distance + '米'
        //       });
        //     }
        //     if (data.taxi_cost) {
              
        //     }

        //   },
        //   fail: function (info) {
        //       console.log(that.data)
        //   }
        // })


        data[j].iconPath = "../../resource/images/marker_checked.png";
        markers.push({
          id: data[j].id,
          latitude: data[j].latitude,
          longitude: data[j].longitude,
          iconPath: data[j].iconPath,
          width: data[j].width,
          height: data[j].height,
          callout: {
            content: data[j].name + "\n" + data[j].address,
            color: '#FFFFFF',
            fontSize: 15,
            borderRadius: 10,
            bgColor: "#f24f3b",
            padding: 2,
            display: 'ALWAYS'
          }
        });

      }else{
        data[j].iconPath = "../../resource/images/marker.png";
        markers.push({
          id: data[j].id,
          latitude: data[j].latitude,
          longitude: data[j].longitude,
          iconPath: data[j].iconPath,
          width: data[j].width,
          height: data[j].height,
          callout: {
            content: data[j].name + "\n" + data[j].address,
            color: '#FFFFFF',
            fontSize: 15,
            borderRadius: 10,
            bgColor: "#f24f3b",
            padding: 2,
            display: 'BYCLICK'
          }
        })
      }
    }

    for (var k = 0; k < that.data.wc_markers.length;k++){
      markers.push(that.data.wc_markers[k])
    }
    that.setData({
      markers: markers
    });
  },
  
  mydetail: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var chosenId = that.data.block_detail_text[index].id;
    var url = '../wc_detail_pic/wc_detail_pic?parkingLot_id=' + chosenId;
    wx.navigateTo({
      url: url,
    })
  },
  showParkPoi: function (selectedPoiLatitude, selectedPoiLongitude, markersData, id){
    // 上传：点击中的poi的经纬度
    // 获取：附近的停车场的id，parkName，startTime，endTime，forwho，longtitude，latitude
    //更新block_detail_text,显示在地图上
    
    console.log("selectedPoiLatitude" + selectedPoiLatitude);
    console.log("selectedPoiLongitude" + selectedPoiLatitude);
    var that =this;
    var my_wc_markers=[];
    
    wx.request({
      url: 'https://rosemary1997.cn/ForTaxiers/Park', //仅为示例，并非真实的接口地址
      data: {
        latitude: selectedPoiLatitude,
        longitude: selectedPoiLongitude
      },
      method: 'POST', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          block_detail_text: res.data.list,
        }) 

        if (res.data.rescode==0){
          that.setData({
            iswc_markersnull: true,
          }) 
        }else{
          that.setData({
            iswc_markersnull: false,
          })
        }
        for (var k = 0; k < res.data.list.length; k++) {
          my_wc_markers.push({
            id: res.data.list[k].id,
            latitude: res.data.list[k].latitude,
            longitude: res.data.list[k].longitude,
            width: 33,
            height: 33,
            iconPath: "../../resource/images/mymarker.png",
            callout: {
              content: res.data.list[k].parkName,
              color: '#f24f3b',
              fontSize: 15,
              borderRadius: 10,
              bgColor: "#FFFFFF",
              padding: 2,
              display: 'ALWAYS'
          }})
        }
        that.setData({
          wc_markers: my_wc_markers
        })
        
        that.changeMarkerColor(markersData, id);
        
      }
    })

   

  }
})