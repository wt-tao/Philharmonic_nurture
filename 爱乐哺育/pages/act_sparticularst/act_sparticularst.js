// pages/act_sparticularst/act_sparticularst.js
var WxParse = require('../../wxParse/wxParse.js');
var Api = require("../../utils/sjc.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  this.setData({
    coverImg: options.coverImg
  })
  var id = options.id
  var that = this
  wx.request({
    url: getApp().globalData.url + '/api/video/get/',
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      id: id
    },
    success: function (res) {
      console.log(res)
      res.data.data.createDate = Api.js_date_time(res.data.data.createDate)

      var da = res.data.data.textContent
      WxParse.wxParse('da', 'html', da, that, 5)
      that.setData({
        data: res.data.data,
        
      })
    }
  })
  },
qw:function(e){
  console.log(e)
  var types = e.currentTarget.id
  var currentTab=2
  var relatedId = e.currentTarget.dataset.id
  if(types==1){
      wx.navigateTo({
        url: '../commodity/commodity?id=' + relatedId,
      })
  }
  else if (types == 2){
    wx.navigateTo({
      url: '../particularss/particularss?id=' + relatedId,
    })
  }
  else if (types == 3) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + relatedId,
    })
  }
  else if (types == 4) {
    wx.navigateTo({
      url: '../subscribe/subscribe?currentTab=' + currentTab,
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
  onShareAppMessage: function (options) {
    var tit = this.data.data
    var coverImg = this.data.coverImg
    var id = this.data.id
    console.log(coverImg)
    return {
      title: tit.title,
      // path: '/pages/sparticularst/sparticularst?id='+id,
      imageUrl: getApp().globalData.url + '/' + coverImg
    }
  }
})