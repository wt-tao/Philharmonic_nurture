// pages/collect/collect.js
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,

    comdList:[]
  },
  currentTabs: function (e) {
    var that = this
    console.log(e)
    var currentTab = e.detail.current
    this.setData({
      currentTab: e.detail.current
    })
    if (currentTab == 0) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/user/myFavorite',
            data: {
              token: res.data,
              type: 1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.setData({
                comdList: res.data.data.list
              })

            }
          })
        }
      })
    }
    else if (currentTab == 1) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/user/myFavorite',
            data: {
              token: res.data,
              type: 2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              var ARR_NEWS_DATA = []
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].updateDate = Api.js_date_time(res.data.data.list[i].updateDate)
                ARR_NEWS_DATA.push(res.data.data.list[i])
              }
              that.setData({
                listArray: res.data.data.list,
              })

            }
          })
        }
      })
    }
  },
  // inpu:function(e){
  // console.log(e)
  // this.setData({
  //   input: e.detail.value
  // })
  // },
  // sous:function(){
  //   var input = this.data.input
  //   wx.getStorage({
  //     key: 'token',
  //     success: function (res) {
  //       wx.request({
  //         url: getApp().globalData.url + '/api/user/myFavorite',
  //         data: {
  //           token: res.data,
  //           type: 1
  //         },
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded' // 默认值
  //         },
  //         method: 'POST',
  //         success: function (res) {
  //           console.log(res)
  //           that.setData({
  //             comdList: res.data.data.list
  //           })

  //         }
  //       })
  //     }
  //   })
  // },
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
      var currentTab = e.target.dataset.current
      if(currentTab==0){
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/user/myFavorite',
              data: {
                token: res.data,
                type: 1
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  comdList: res.data.data.list
                })

              }
            })
          }
        })
      }
      else if(currentTab==1){
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.request({
              url: getApp().globalData.url + '/api/user/myFavorite',
              data: {
                token: res.data,
                type: 2
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                var ARR_NEWS_DATA = []
                for (var i = 0; i < res.data.data.list.length; i++) {
                  res.data.data.list[i].updateDate = Api.js_date_time(res.data.data.list[i].updateDate)
                  ARR_NEWS_DATA.push(res.data.data.list[i])
                } 
                that.setData({
                  listArray: res.data.data.list,
                })

              }
            })
          }
        })
      }
    }
  },
  qx:function(e){
    var id = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/favorite',
          data: {
            token: res.data,
            id: id,
            type: 1,
            add: false,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
           if (res.data.code == 203) {
              wx.showToast({
                title: '已取消收藏',
                duration: 2000,
                  success:function(){
                    
                    wx.showModal({
                      title: '我的收藏',
                      content: '暂无收藏，快去逛逛吧',
                      success:function(res){
                        // console.log(res)
                        if(res.confirm){
                          wx.reLaunch({
                            url: '../collect/collect',
                          })
                        }
                        else if(res.cancel){
                          wx.redirectTo({
                           
                            url: '../collect/collect',
                          })
                        }
                      }
                    })
                  }
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
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/myFavorite',
          data: {
            token: res.data,
            type: 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
           that.setData({
             comdList:res.data.data.list
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