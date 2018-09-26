// pages/serve/serve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    currentTabs: 0,

    mrList:[],
    url: getApp().globalData.url,
  },
  
  
  mrqr:function(e){
    console.log(e)
    var that = this
    wx.showModal({
      title: '请确认',
      content: '确认完成吗',
      success:function(r){
        if(r.confirm){
          var lastAppointmentId = e.currentTarget.id
          wx.getStorage({
            key: 'token',
            success: function (res) {
              wx.request({
                url: getApp().globalData.url + '/api/services/confirmAppointment',
                data: {
                  token: res.data,
                  id: lastAppointmentId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  if (res.data.code == '512') {
                    wx.showModal({
                      title: '还未完成',
                      content: '还未完成本次服务，请完成本次服务后再确认完成',
                    })
                  }
                  if (res.data.code == '203') {
                    wx.showToast({
                      title: '已完成本次服务',
                      duration: 2000,
                      success: function () {
                        that.onShow()
                      }
                    })
                  }
                  // that.setData({
                  //   mrssList: res.data.data.list
                  // })
                }
              })
            },
          })
        }
      }
    })
    
   
  },

  del:function(e){
    // console.log(e)
    wx.showModal({
      title: '请确认',
      content: '确认删除吗',
      success: function(res) {
        if(res.cancel){
          var type = e.currentTarget.id
          var id = e.currentTarget.dataset.id
          wx.getStorage({
            key: 'token',
            success: function (res) {
              wx.request({
                url: getApp().globalData.url + '/api/services/delete',
                data: {
                  token: res.data,
                  id: id,
                  type: type
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  if (res.data.code == '204') {
                    wx.showToast({
                      title: '删除成功',
                      duration: 2000,
                      success: function () {
                        that.onShow()
                      }
                    })
                  }

                  // that.setData({
                  //   mrssList: res.data.data.list
                  // })
                }
              })
            },
          })
        }
      },
  
    })
 
  },
  currentTab0:function(e){
    var that = this;
    var currentTab = e.detail.current
    this.setData({
      currentTab: e.detail.current
    })

      if (currentTab == 0) {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                // status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  mrList: res.data.data.list
                })
              }
            })
          },
        })
      }
      if (currentTab == 1) {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                status: 2,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  mrssList: res.data.data.list
                })
              }
            })
          },
        })
      }
      if (currentTab == 2) {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                status: 1,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  tmrssLists: res.data.data.list
                })
              }
            })
          },
        })
      }

    
  },
  /**
    * 选项卡
    */
  swichNav: function (e) {
    var that = this;
    var currentTab = e.target.dataset.current
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
      let that = this;

      if (currentTab == '0') {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                // status: status
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  mrList: res.data.data.list
                })
              }
            })
          },
        })
      }
      if (currentTab == '1') {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                status: 2,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  mrssList: res.data.data.list
                })
              }
            })
          },
        })
      }
      if (currentTab == '2') {
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/services/myServices',
              data: {
                token: res.data,
                status: 1,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  tmrssLists: res.data.data.list
                })
              }
            })
          },
        })
      }
    
    }
  },
  
  evaluate:function(e){
    // console.log(e)
    let type = e.currentTarget.id
    let lastAppointmentId = e.currentTarget.dataset.id
    let img = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../evaluate/evaluate?img=' + img + '&&lastAppointmentId=' + lastAppointmentId,
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
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/services/myServices',
          data: {
            token: res.data,
            // status: status
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            that.setData({
              mrList: res.data.data.list
            })
          }
        })
      },
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