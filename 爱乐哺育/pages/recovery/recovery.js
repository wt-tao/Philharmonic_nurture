// pages/recovery/recovery.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marital:'0',
    contact: '',
    contactPhone: '',
  },
  contact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  contactPhone: function (e) {
    this.setData({
      contactPhone: e.detail.value
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
    wx.reLaunch({
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

  radioCheckedChange: function (e) {
    var marital = e.detail.value
    var price=this.data.price
    var pricess = (this.data.price)*10
    this.setData({
      marital: e.detail.value,
      price:price/10
    })
   if (marital == '1') {
      this.setData({
        price: pricess
      })
    }
  },
  tj:function(){
    var that=this
    var count_index = this.data.marital
    var check_total=this.data.price
    var contact_name = this.data.contact
    var contact_phone = this.data.contactPhone
    if (contact_name == '') {
      this.wetoast.toast({
        title: '请填写姓名',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }
    else if (contact_phone == '') {
      this.wetoast.toast({
        title: '请填写联系电话',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }else{
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/services/buy_postRehabilitation',
          data: {
            token: res.data,
            count_index: count_index,
            check_total: check_total,
            contact_phone: contact_phone,
            contact_name: contact_name
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var orders = res.data.data
            if (res.data.code == '511') {
              wx.showModal({
                title: '提示',
                content: '您已经购买该服务，请前往预约',
                success: function (r) {
                  if (r.confirm) {
                    wx.navigateTo({
                      url: '../addorder/addorder',
                    })
                  }
                }
              })
            }else if (res.data.code == 663) {
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
              wx.showModal({
                title: '购买该服务',
                content: '您确定购买该服务吗？',
                success: function (re) {
                  if (re.confirm) {
                    wx.login({
                      success: function (res) {
                        console.log(res)
                        var code = res.code
                        wx.getStorage({
                          key: 'token',
                          success: function (res) {
                            wx.request({
                              url: getApp().globalData.url + '/api/orders/code',
                              data: {
                                token: res.data,
                                code: code,
                                ordersId: orders

                              },
                              header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                              },
                              method: 'POST',
                              success: function (res) {
                                console.log(res)
                                var ides = 1
                                let sesstion = res.data.data.session;
                                //微信支付
                                let timeStamp = res.data.data.timeStamp; //new Date().getTime(),
                                console.log(timeStamp)
                                let nonceStr = res.data.data.nonceStr;
                                let packaged = res.data.data.package;
                                let paySign = res.data.data.paySign;
                                wx.requestPayment({
                                  'timeStamp': timeStamp,
                                  'nonceStr': nonceStr, //随机字符串，长度为32个字符以下。
                                  'package': packaged,
                                  'signType': 'MD5',
                                  'paySign': paySign,
                                  'success': function (res) {
                                    wx.showToast({
                                      title: '支付成功',
                                      duration: 2000,
                                      success: function () {
                                        wx.redirectTo({
                                          url: '../addorder/addorder?id=' + ides,
                                        })
                                      }
                                    })

                                  },
                                  'fail': function (res) { },

                                })

                              },
                              fail: function () { },
                              complete: function () { }

                            })
                          },
                        })
                      }
                    })
                  }
                }
              })

            }
          }
        })
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()
    var that=this
    wx.request({
      url: getApp().globalData.url + '/api/services/postRehabilitationPrice',
      data: {
    
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          price:res.data.data
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