// pages/integral/integral.js
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integralList:[],
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/integralRecord',
          data: {
            token: res.data,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            // 时间戳转换
              var ARR_NEWS_DATA = []
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].createDate = Api.js_date_time(res.data.data.list[i].createDate)
                ARR_NEWS_DATA.push(res.data.data.list[i])
            }  
            that.setData({
              integralList: res.data.data.list,
              obj: res.data.data.obj
            })
          }
        })
      }
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