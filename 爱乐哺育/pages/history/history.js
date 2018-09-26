// pages/history/history.js
var Api = require("../../utils/sjc.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    data:[],  
    show:true,
    show1:false
    },
  comditiy: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../commodity/commodity?id=' + id,
    })
  },
  ins:function(){
    var key=this.data.key
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/browsingHistory',
          data: {
            token: res.data,
            key: key,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            // var ARR_NEWS_DATA = []
            // for (var i = 0; i < res.data.data.length; i++) {
            //   res.data.data[i].browsingDate = Api.js_date_time(res.data.data[i].browsingDate)
            //   ARR_NEWS_DATA.push(res.data.data[i])
            // } 
            that.setData({
              datas: res.data.data,
              show: false,
              show1: true,
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
      }
    })
  },
  inpu:function(e){
    var key= e.detail.value
    this.setData({
      key: key
    })
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/browsingHistory',
          data: {
            token: res.data,
            key:key,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            // var ARR_NEWS_DATA = []
            // for (var i = 0; i < res.data.data.length; i++) {
            //   res.data.data[i].browsingDate = Api.js_date_time(res.data.data[i].browsingDate)
            //   ARR_NEWS_DATA.push(res.data.data[i])
            // } 
            that.setData({
              datas: res.data.data,
              show:false,
              show1:true,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/browsingHistory',
          data: {
            token: res.data,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            // var ARR_NEWS_DATA = []
            // for (var i = 0; i < res.data.data.length; i++) {
            //   res.data.data[i].browsingDate = Api.js_date_time(res.data.data[i].browsingDate)
            //   ARR_NEWS_DATA.push(res.data.data[i])
            // } 
            that.setData({
              data:res.data.data
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