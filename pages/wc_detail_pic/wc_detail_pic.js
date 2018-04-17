// 返回厕所的详细信息（图片）
// 传入parkingLot_id
// 服务器返回图片url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingLot_id:null,
    pic_url:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
    var url=null;
    var ParkingLocationid=0;
    if (e && e.parkingLot_id) {
    // ParkingLocationid= 269 + e.parkingLot_id;
      that.setData({
        parkingLot_id: e.parkingLot_id
      })
      // if (that.data.parkingLot_id == 1) {
      //   url = "http://139.199.85.13:8080/Images/ParkingLocation270.jpg"
      //   console.log("parkingLot_id==1");
      // }
      // else {
      //   url = "http://139.199.85.13:8080/Images/ParkingLocation272.jpg"
      //   console.log("parkingLot_id==2");
      // }
    }
    url = "http://139.199.85.13:8080/Images/ParkingLocation" + (Number(e.parkingLot_id)+269)+".jpg"
    console.log("ParkingLocationid" + (Number(e.parkingLot_id) + 269))
    console.log("e.parkingLot_id" + e.parkingLot_id)
    that.setData({
      pic_url: url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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