// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    show1:false,
    url: getApp().globalData.url,
    status:'',
    orderList:[],
    state0:'0',
    state1:'0'
  },
  orderps:function(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../orderps/orderps?id='+id,
    })
  },
  currentTabs: function (e) {
    var that = this
    console.log(e)
    var currentTab = e.detail.current
    this.setData({
      currentTab: e.detail.current
    })
    if (currentTab == 1) {
      var status = 0
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/orders/list',
            data: {
              token: res.data,
              status: status
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              // if(res.data.data)
              that.setData({
                orderList: res.data.data.list
              })
            }
          })
        }
      })
    }
    if (currentTab == 2) {
      var status = 1
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/orders/list',
            data: {
              token: res.data,
              status: status
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              // if(res.data.data)
              that.setData({
                orderList: res.data.data.list
              })
            }
          })
        }
      })
    }
    if (currentTab == 3) {
      var status = 2
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/orders/list',
            data: {
              token: res.data,
              status: status
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              // if(res.data.data)
              that.setData({
                orderList: res.data.data.list
              })
            }
          })
        }
      })
    }
    if (currentTab == 0) {
      var status = this.data.status
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/orders/list',
            data: {
              token: res.data,
              status: status
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              // if(res.data.data)
              that.setData({
                orderList: res.data.data.list
              })
            }
          })
        }
      })
    }
    if (currentTab == 4){
      wx.navigateTo({
        url: '../seeks/seeks',
      })
    }
  },
  del:function(e){
    var that=this
    var ordersId = e.currentTarget.id
    wx.showModal({
      title: '请确认',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
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
                duration:2000,
                success:function(){
                  that.onShow()
                }
              })
          }
        })
      }
    })
        }
        }
      })
  },
  /**
    * 选项卡
    */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
      let that = this;
      var currentTab = e.target.dataset.current
      if (currentTab==1){
        var status = 0
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/orders/list',
              data: {
                token: res.data,
                status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                // if(res.data.data)
                that.setData({
                  orderList: res.data.data.list
                })
              }
            })
          }
        })
      }
      if (currentTab == 2) {
        var status = 1
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/orders/list',
              data: {
                token: res.data,
                status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                // if(res.data.data)
                that.setData({
                  orderList: res.data.data.list
                })
              }
            })
          }
        })
      } if (currentTab == 4){
        wx.navigateTo({
          url: '../seeks/seeks',
        })
      }
      if (currentTab == 3) {
        var status = 2
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/orders/list',
              data: {
                token: res.data,
                status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                // if(res.data.data)
                that.setData({
                  orderList: res.data.data.list
                })
              }
            })
          }
        })
      }
      if (currentTab == 0) {
        var status = this.data.status
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/orders/list',
              data: {
                token: res.data,
                status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                // if(res.data.data)
                that.setData({
                  orderList: res.data.data.list
                })
              }
            })
          }
        })
      }

    }
  },
  // 确认收货
  qqr:function(e){
    var that=this
    var ordersId = e.currentTarget.id
    wx.showModal({
      title: '请确认',
      content: '确认收货吗',
      success: function(res) {
        if(res.confirm){
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
                        that.onShow()
                      }
                    })
                  }

                }
              })
            }
          })
        }
      },    
    })
    
  },
  // 取消订单
  ord:function(e){
    var that=this
    var ordersId = e.currentTarget.id
    wx.showModal({
      title: '请确认',
      content: '确认取消吗',
      success: function (res) {
        if (res.confirm) {
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
            if(res.data.code==203){
              wx.showToast({
                title: '取消订单成功',
                duration:2000,
                success:function(){
                 that.onShow()
                }
              })
            }
           
          }
        })
      }
    })
        }
      }
    })
  },
  // 发起支付
  pay:function(e){
    console.log(e)
    var orders = e.currentTarget.id
    var sjcprice = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../pay/pay?orders=' + orders + '&&sjcprice=' + sjcprice,
    })
  },
  logistics:function(e){
    var express_code = e.currentTarget.id
    wx.navigateTo({
      url: '../logistics/logistics?express_code=' + express_code,
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
    var status = this.data.status
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/orders/list',
          data: {
            token: res.data,
            status: status
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            // if(res.data.data)
            that.setData({
              orderList: res.data.data.list,
              state0: res.data.data.obj.state0,
              state1: res.data.data.obj.state1
            })
          }
        })
      }
    })
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