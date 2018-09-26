// pages/particulars/particulars.js
var WxParse = require('../../wxParse/wxParse.js');
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    token:'',
  },
  addorder: function (e) {
    var id = e.currentTarget.id
    var token = wx.getStorageSync('token')
    // console.log(token)
    if (token) {
      this.setData({
        token: token
      })
    }
    var token = this.data.token
    if (token == '') {
      // console.log('asdfsfsdfsd')
      wx.showModal({
        title: '请先登录',
        content: '您还未登录，请先登录',
        success: function (r) {
          if (r.confirm) {
            wx.reLaunch({
              url: '../index/index',
            })
          }

        }
      })
    }
    else {
    wx.navigateTo({
      url: '../addorder/addorder?id=' + id
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var id=options.id
  this.setData({
    id:id
  })
 
  var that=this
  wx.request({
    url: getApp().globalData.url + '/api/services/detail',
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      id:id
    },
    success: function (res) {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.data.name,
      })
      //数组时间戳转换   
      var ARR_NEWS_DATA = []
      for (var i = 0; i < res.data.data.appraiseList.length; i++) {
        res.data.data.appraiseList[i].createDate = Api.js_date_time(res.data.data.appraiseList[i].createDate)
        ARR_NEWS_DATA.push(res.data.data.appraiseList[i])
      } 
      var da = res.data.data.describes
      WxParse.wxParse('da', 'html', da, that, 5)
      that.setData({
        detailList:res.data.data,
        appraiseList: res.data.data.appraiseList,
      })
    }
  })
  },
goumai:function(e){
  // console.log(e)
  var id = e.currentTarget.id
  var token = wx.getStorageSync('token')
  // console.log(token)
  if (token) {
    this.setData({
      token: token
    })
  }
  var token = this.data.token
  if (token == '') {
    // console.log('asdfsfsdfsd')
    wx.showModal({
      title: '请先登录',
      content: '您还未登录，请先登录',
      success: function (r) {
        if (r.confirm) {
          wx.reLaunch({
            url: '../index/index',
          })
        }

      }
    })
  }
  else {
    if(id==1){
      wx.navigateTo({
        url: '../recovery/recovery',
      })
    }
    if (id == 2) {
      wx.navigateTo({
        url: '../guidance/guidance',
      })
    }
 
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
    var detailList = this.data.detailList
    return {
      title: detailList.name+'详情',
      // path: '/pages/sparticularst/sparticularst?id='+id,
      imageUrl: getApp().globalData.url + '/' + detailList.img
    }
  
  }
})