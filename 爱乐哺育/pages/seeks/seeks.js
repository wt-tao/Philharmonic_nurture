// pages/seeks/seeks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    search: '请输入关键字搜索',
    orderList: [],
    url: getApp().globalData.url,
  },
  del: function (e) {
    var ordersId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/delete',
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
            wx.showToast({
              title: '删除成功',
              duration: 2000,
              success: function () {
                wx.reLaunch({
                  url: '../my/my',
                })
              }
            })
          }
        })
      }
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
  // 取消订单
  ord: function (e) {
    var ordersId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/cancel',
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
                title: '取消订单成功',
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
  // 发起支付
  pay: function (e) {
    console.log(e)
    var orders = e.currentTarget.id
    var sjcprice = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../pay/pay?orders=' + orders + '&&sjcprice=' + sjcprice,
    })
  },
  logistics: function () {
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },
  input: function (e) {
    this.setData({
      sear: e.detail.value
    })
  },
  ss: function () {
    var that = this
    var sear = this.data.sear
    var type = this.data.type
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/list',
          data: {
            token: res.data,
        key: sear,
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          orderList: res.data.data.list,
          totalCount: res.data.data.totalCount,
          show: true
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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