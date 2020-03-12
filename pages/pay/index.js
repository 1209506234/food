// pages/pay/index.js

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartFoodList: [],
    userInfo: {},
    address: '',
    isCheckAll:true,
    totalSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    console.log(options.data)
    this.data.cartFoodList = JSON.parse(options.data)

    //获取用户信息
    let userInfo = app.globalData.userInfo

    //得到定位信息
    wx.getLocation({
      success: function(res) {
        console.log(res)
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location= ',
          data: {
            location: `${res.latitude},${res.longitude}`,
            key: "MSLBZ-CMB6V-MSMPE-UMTXR-34JP7-AKFPB"
          },
          success(address) {
            console.log(address.data.result.address)
            _this.setData({
              address: address.data.result.address
            })
          }
        })
      },
    })


    this.setData({
      cartFoodList: this.data.cartFoodList,
      userInfo
    })
    this.calcTotalSum();
  },

  choose(e) {
    let index = e.currentTarget.dataset.idx;
    this.data.cartFoodList[index].checked = !this.data.cartFoodList[index].checked;

    let isCheckAll = this.data.cartFoodList.every(item => item.checked)

    this.setData({
      cartFoodList: this.data.cartFoodList,
      isCheckAll
    })

    this.calcTotalSum();
  },

  calcTotalSum(){
    let totalSum = 0;

    this.data.cartFoodList.forEach(item => {
      if(item.checked){
        totalSum += item.price * item.count
      }
    })
    this.setData({
      totalSum
    })

  },

  chooseAll(){
    let isCheckAll = !this.data.isCheckAll;

    this.data.cartFoodList.forEach(item => {
      item.checked = isCheckAll;
    })

    this.setData({
      isCheckAll,
      cartFoodList: this.data.cartFoodList
    })

    this.calcTotalSum();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})