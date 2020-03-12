// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuType:[],
    food:[],
    activeIndex:0,
    selecteId:"item0",
    showBack:false,
    cartFoodList:[],
    totalSum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.fastmock.site/mock/3e844ad90beb54329a272eb95b502c25/demo001/menutype',
      success: res=>{
        //console.log(res.data.menuType)
          this.setData({
            menuType: res.data.menuType
          })
      }
    }),
    wx.request({
      url: 'https://www.fastmock.site/mock/3e844ad90beb54329a272eb95b502c25/demo001/food',
      success : res =>{
        console.log(res.data)
        this.setData({
          food: res.data.food
        })
      }
    })
  },

  choosen:function(e) {
    //console.log(e.currentTarget.dataset.idx)
    //let index = e.currentTarget.dataset.idx;
    //console.log(this.data.menuType[index]);
    this.data.activeIndex = e.currentTarget.dataset.idx;

    //右边滚动效果
    this.data.selecteId = "item" + this.data.activeIndex;
    
    this.setData({
      activeIndex: this.data.activeIndex,
      selecteId: this.data.selecteId 
    })
  },

  plus(e) {
    console.log(e.currentTarget.dataset.idx)
    let index = e.currentTarget.dataset.idx;
    this.data.food[index].count++;
    
    this.setData({
      food : this.data.food
    })

    //往购物车数组里添加数据
    if (!this.data.cartFoodList.includes(this.data.food[index])){
      this.data.cartFoodList.unshift(this.data.food[index])
    }

    this.setData({
      cartFoodList: this.data.cartFoodList
    });
    this.calcSum();
  },

  minus(e) {
    let index = e.currentTarget.dataset.idx;
    this.data.food[index].count--;

    if (this.data.food[index].count==0){
      let idx = this.data.cartFoodList.indexOf(this.data.food[index])
      this.data.cartFoodList.splice(idx,1)
    }

    this.setData({
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    })
    this.calcSum();
  },

  //购物车数组的添加按钮响应函数
  cartPlus(e){
    let index = e.currentTarget.dataset.idx;
    this.data.cartFoodList[index].count++;

    this.setData({
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    })
    this.calcSum();
  },

  calcSum(){
    let sum = 0;
    for (var i = 0; i < this.data.cartFoodList.length; i++){
      sum = sum + this.data.cartFoodList[i].price * this.data.cartFoodList[i].count
    }
    this.setData({
      totalSum:sum
    })
  },

  cartMinus(e){
    let index = e.currentTarget.dataset.idx;
    this.data.cartFoodList[index].count--;

    if (this.data.cartFoodList[index].count < 1){
      this.data.cartFoodList.splice(index, 1)
    }
    this.setData({
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    })
    this.calcSum();
  },

  balance(){
    this.setData({
      showBack:!this.data.showBack
    })
  },

  pay(){
    if (this.data.totalSum === 0){
      wx.showToast({
        title: '您还未选择商品',
      })
      return;
    }
    wx.navigateTo({
      url: '../pay/index?data=' + JSON.stringify(this.data.cartFoodList)
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