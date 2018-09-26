// pages/orderps/orderps.js
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    commodities:[],
    url: getApp().globalData.url,
    status:'0'
  },
// wl:function(){
// wx.navigateTo({
//   url: '../logistics/logistics',
// })
// },
  pay:function(e){
      wx.navigateTo({
        url: '../pay/pay?orders=' + e.currentTarget.id + '&&sjcprice=' + e.currentTarget.dataset.pay,
      })
  },
  tel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  // 确认收货
  qqr: function (e) {
    var ordersId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/confirm_receipt',
          data: {
            token: res.data,
            ordersId: ordersId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if (res.data.code == 203) {
              wx.showToast({
                title: '确认收货成功',
                duration: 2000,
                success: function () {
                  wx.reLaunch({
                    url: '../my/my',
                  })
                }
              })
            }

          }
        })
      }
    })
  },
  logistics: function (e) {
    var express_code = e.currentTarget.id
    wx.navigateTo({
      url: '../logistics/logistics?express_code=' + express_code,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // console.log(options)
  var that=this
  var id = options.id
  wx.getStorage({
    key: 'token',
    success: function (res) {
      wx.request({
        url: getApp().globalData.url + '/api/orders/detail',
        data: {
          token: res.data,
          id: id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          // if(res.data.data)
          res.data.data.createDate = Api.js_date_time(res.data.data.createDate)     //对象时间戳转换  创建时间
          if (res.data.data.status==0){
            res.data.data.payedTime='未付款',
              res.data.data.sendTime = '未发货'
          }
          else{   
            res.data.data.sendTime = Api.js_date_time(res.data.data.sendTime)     //对象时间戳转换  发货时间
            res.data.data.payedTime = Api.js_date_time(res.data.data.payedTime)     //对象时间戳转换  
          }
          that.setData({
            contactPhone: res.data.data.contactPhone,
            address: res.data.data.address,
            commodities: res.data.data.commodities,
            total: res.data.data.total,
            settlement_total: res.data.data.settlement_total,
            freight: res.data.data.freight,
            id:id,
            createDate:res.data.data.createDate,
            sendTime: res.data.data.sendTime,
            payedTime: res.data.data.payedTime,
            status: res.data.data.status,
            express_code: res.data.data.express_code
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