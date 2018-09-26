// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconFlag1: true,
    iconFlag2: false,
  },
  tongyi: function () {
    var iconFlag1 = this.data.iconFlag1;
    var iconFlag2 = this.data.iconFlag2;
    if (iconFlag1) {
      this.setData({
        iconFlag1: false,
        iconFlag2: true,
      })
    } else {

      this.setData({
        iconFlag1: true,
        iconFlag2: false,
      })
    }
  },
  /**
* 重新登录
*/
  login: function () {
    var orders = this.data.orders
    var sjcprice = this.data.sjcprice
    let that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.setStorageSync(config.cacheKey.userCode, res.code);
        let data = {
          ordersId: orders,
          code: code
        }
        that.pay(data);
      }
    });

  },
  pay:function(){
    var iconFlag2 = this.data.iconFlag2
    var orders = this.data.orders
    var sjcprice = this.data.sjcprice
    var that=this
    if (iconFlag2==false){
          wx.showToast({
            title: '请选择支付方式',
            image: '../../image/th.png',
            duration:2000,
          })
    } else if (iconFlag2 == true){
    wx.login({
      success: function (res) {
        console.log(res)
        var code=res.code
        wx.getStorage({
          key: 'token',
          success: function(res) {
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
              success:function(res){
                console.log(res)
                let sesstion = res.data.data.session;
                //微信支付
                let timeStamp = res.data.data.timeStamp; //new Date().getTime(),
                console.log(timeStamp)
                let nonceStr = res.data.data.nonceStr;
                let packaged = res.data.data.package;
                let paySign = res.data.data.paySign;
                wx.showToast({
                  title: '',
                  icon:'loading',
                  duration:2000,
                  success:function(){
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
                              url: '../my/my',
                            })
                          }
                        })

                      },
                      'fail': function (res) { },

                    })
                  }
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  var sjcprice = options.sjcprice
  var orders = options.orders
  this.setData({
    sjcprice: sjcprice,
    orders: orders,
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