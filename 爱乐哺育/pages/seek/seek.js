// pages/seek/seek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'请输入关键字搜索',
    type:'0',
    list:[],
    show:false,
  },
  input:function(e){
    this.setData({
      sear: e.detail.value
    })
  },
  tz:function(e){
    console.log(e)
    var id = e.currentTarget.id
    var type = e.currentTarget.dataset.id
    if (type==1){
      wx.navigateTo({
        url: '../commodity/commodity?id='+id,
      })
    }
    if (type == 2) {
      wx.navigateTo({
        url: '../sparticularst/sparticularst?id=' + id,
      })
    }
  },
  ss:function(){
    var that=this
    var sear = this.data.sear
    var type=this.data.type
    wx.request({
      url: getApp().globalData.url + '/api/main/search',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        type: type,
        page:1,
        key: sear,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list:res.data.data.list,
          totalCount:res.data.data.totalCount,
          show:true
        })
        if (res.data.data.list.length == 0) {
          wx.showToast({
            title: '搜索为空',
            icon: 'loading',
            duration: 2000,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.type
    var that=this
    var key=options.key
  console.log(options)
  if (key.length<2){
    wx.showToast({
      title: '字数太少',
      duration:3000,
    })
  }else{
    this.setData({
      search: options.key
    })
    wx.request({
      url: getApp().globalData.url + '/api/main/search',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        type: type,
        page: 1,
        key: key,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          totalCount: res.data.data.totalCount,
          show: true,
          sear: key
        })
      }
    })
  }
   

   
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