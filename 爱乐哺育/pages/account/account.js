// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  gx:false,
  url: getApp().globalData.url,
  chartIds_training:[],
  chartIds_commodity:[],
  dkc:'0',
  token: '',
  },
  goux:function(){
    var gx=this.data.gx
    var dkc=this.data.dk
    var total_price = this.data.total_price
      this.setData({
        sjcprice: total_price - dkc,
        dkc:dkc,
        gx: true
      })
    if(gx==true){
      this.setData({
        sjcprice: total_price,
        gx:false,
        dkc:0,
      })    
    } 
},
  shippingInfo:function(){
  wx.navigateTo({
    url: '../shippingInfo/shippingInfo',
  })
  },
zhifu:function(){
  var taht=this
  var tpid=this.data.tpid
  var ids = this.data.ids
  var types = this.data.types
  var gx=this.data.gx
  var chartIds_commodity = this.data.chartIds_commodity
  var chartIds_training = this.data.chartIds_training
  var sjcprice = this.data.sjcprice
  if(tpid==1){
  wx.getStorage({
    key: 'token',
    success: function (res) {
      wx.request({
        url: getApp().globalData.url + '/api/orders/submit',
        data: {
          token: res.data,
          chartIds_commodity: chartIds_commodity,
          chartIds_training: chartIds_training,
          check_total: sjcprice,
          useIntegral: gx
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          var orders = res.data.data
          if(res.data.code=='301'){
              wx.showModal({
                title: '无收货信息',
                content: '请前往填写收货信息',
                success:function(e){
                  if(e.confirm){
                    wx.navigateTo({
                      url: '../shippingInfo/shippingInfo',
                    })
                  }
                }
              })
          }
          if(res.data.code==200){
            wx.showToast({
              title: '提交成功',
              duration:2000,
              success:function(){
                wx.navigateTo({
                  url: '../pay/pay?orders=' + orders + '&&sjcprice=' + sjcprice,
                  })
              }
            })
          }
          
        }
      })
    }
  })
  }
  if (tpid == 2) {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/submit_buyNow',
          data: {
            token: res.data,
            type: types,
            id: ids,
            check_total: sjcprice,
            useIntegral: gx
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var orders = res.data.data
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
                duration: 2000,
                success: function () {
                  wx.navigateTo({
                    url: '../pay/pay?orders=' + orders + '&&sjcprice=' + sjcprice,
                  })
                }
              })
            }

          }
        })
      }
    })
  }
},
  tel:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  var js=options.js
  var types=options.types
  var chartIds_commodity = options.chartIds_commodity
  var chartIds_training = options.chartIds_training
  var id=options.id
  this.setData({
    chartIds_commodity: chartIds_commodity,
    chartIds_training: chartIds_training,
    id:id
  })
  var that = this
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
  if(js==0){
      wx.request({
        url: getApp().globalData.url + '/api/chart/clearChart',
        data: {
          token: token,
          chartIds_commodity: chartIds_commodity,
          chartIds_training: chartIds_training
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 663) {
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
        else  if (res.data.data.shippingInfo=='null'){
              wx.showToast({
                title: '请完善收货信息',
                image:'../../image/th.png',
                duration:2000,
              })
          }else{
            var dk = (res.data.data.integral) * 1 / 100
          that.setData({
            contactPhone: res.data.data.contactPhone,
            sjcprice: res.data.data.total_price,
            dk:dk,
            integral: res.data.data.integral,
            zl: res.data.data.shippingInfo,
            tp: res.data.data.list,
            total_price: res.data.data.total_price,
            tpid:1,
          })
          }
        }
      })  
  }
  if(js==1){
        wx.request({
          url: getApp().globalData.url + '/api/chart/buyNow',
          data: {
            token: token,
            id:id,
            type: types
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if (res.data.code == 663) {
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
           else if (res.data.data.shippingInfo == 'null') {
              wx.showToast({
                title: '请完善收货信息',
                image: '../../image/th.png',
                duration: 2000,
              })
            }
           else{
              var dk = (res.data.data.integral) * 1 / 100
            that.setData({
              contactPhone: res.data.data.contactPhone,
              sjcprice: res.data.data.total_price,
              dk: dk,
              integral: res.data.data.integral,
              zl: res.data.data.shippingInfo,
              tp: res.data.data.list,
              total_price: res.data.data.total_price,
              tpid:2,
              types:types,
              ids:id,
            })
            }
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