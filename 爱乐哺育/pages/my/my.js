// pages/my/my.js
var Api = require("../../utils/sjc.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    token:'',
  },
  order: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  serve: function () {
    wx.navigateTo({
      url: '../serve/serve',
    })
  },
  collect: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  history: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  integral: function () {
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  datum:function(){
    wx.navigateTo({
      url: '../datum/datum',
    })
  },
  leave:function(){
    wx.navigateTo({
      url: '../leave/leave',
    })
  },
  yuyue: function () {
    wx.reLaunch({
      url: '../subscribe/subscribe',
    })
  },
  index: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  active: function () {
    wx.navigateTo({
      url: '../active/active',
    })
  },
  cart: function () {
    wx.reLaunch({
      url: '../cart/cart',
    })
  },
  my: function () {
    wx.reLaunch({
      url: '../my/my',
    })
  },
  tc :function () {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/login/logOut',
          data: {
            token: res.data,

          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            wx.removeStorage({
              key: 'token',
              success: function (res) {
                wx.showToast({
                  title: '退出成功',
                  duration:2000,
                  success:function(){
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }
                })              
              }
            })  
          }
        })
      }
    })
  },
  reg:function(){
      wx.reLaunch({
        url: '../index/index?lg=1',
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
    var that = this
    var token = wx.getStorageSync('token')
    // console.log(token)
    if (token) {
      this.setData({
        token: token
      })
    }
    var token = this.data.token
    // if (token == '') {
    //   // console.log('asdfsfsdfsd')
    //   wx.showModal({
    //     title: '请先登录',
    //     content: '您还未登录，请先登录',
    //     success: function (r) {
    //       if (r.confirm) {
    //         wx.reLaunch({
    //           url: '../index/index',
    //         })
    //       }

    //     }
    //   })
    // }
    // else {
      wx.request({
        url: getApp().globalData.url + '/api/user/userCenter',
        data: {
          token: token,

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 612) {
            that.setData({
              code: res.data.code,
              datas:'注册/登录'
            })
            // wx.showModal({
            //   title: '提示',
            //   content: '用户未登录,请登录',
            //   success: function (res) {
            //     console.log(res)
            //     if (res.confirm) {
            //       wx.removeStorage({
            //         key: 'token',
            //         success: function () {
            //           var lg = 1
            //           wx.reLaunch({
            //             url: '../index/index?lg=' + lg,
            //           })
            //         }
            //       })
            //     }

            //   }
            // })
          } else if (res.data.code == 663) {
            wx.showModal({
              title: '登录超时',
              content: "登录已超时，请重新登录",
              success: function (r) {
                if (r.confirm) {
                  var lg = 1
                  wx.reLaunch({
                    url: '../index/index?lg=' + lg,
                  })
                }
              }
            })
          }
          else {
            res.data.data.createDate = Api.js_date_time(res.data.data.createDate)     //对象时间戳转换
            that.setData({
              datas: '注册时间：',
              code:res.data.code,
              my: res.data.data
            })
          }

        }
      })
    // }
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