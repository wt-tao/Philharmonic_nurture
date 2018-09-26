// pages/sparticularst/sparticularst.js
var WxParse = require('../../wxParse/wxParse.js');
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s1: true, s2: false,
    token:'',
    video:false,
    show:true,
    url: getApp().globalData.url,
  },
  // 收藏
  sc: function () {
    var that = this
    var id = this.data.id
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
        wx.request({
          url: getApp().globalData.url + '/api/user/favorite',
          data: {
            token: token,
            id: id,
            type: 2,
            add: true,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var lg = 1
            if (res.data.code == 612) {
              wx.showToast({
                title: '请登录',
                duration: 2000,
                success: function () {
                  wx.reLaunch({
                    url: '../index/index?lg=' + lg,
                  })
                }
              })
            } else if (res.data.code==663) {
              wx.showModal({
                title: '登录超时',
                content: '登录超时，请重新登录',
                success:function(r){
                  if(r.confirm){
                    wx.reLaunch({
                      url: '../index/index?lg=' + lg,
                    })
                  }
                }
              })
            }
            
            else if (res.data.code == 203) {
              wx.showToast({
                title: '收藏成功',
                duration: 2000,
                success: function () {
                  that.setData({
                    s1: false,
                    s2: true,
                  })
                }

              })
            }
            else if (res.data.code == 663) {
              var lg = 1
              wx.showModal({
                title: '登录超时',
                content: '请重新登录',
                success: function (r) {
                  if (r.confirm) {
                    wx.reLaunch({
                      url: '../index/index?lg=' + lg,
                    })
                  }
                }
              })
            }
          }
        })
    }
  },
  sc1: function () {
    var that = this
    var id = this.data.id
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
        wx.request({
          url: getApp().globalData.url + '/api/user/favorite',
          data: {
            token:token,
            id: id,
            type: 2,
            add: false,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var lg = 1
            if (res.data.code == 612) {
              wx.showToast({
                title: '请登录',
                duration: 2000,
                success: function () {
                  wx.reLaunch({
                    url: '../index/index?lg=' + lg,
                  })
                }
              })

            } else if (res.data.code == 203) {
              wx.showToast({
                title: '已取消收藏',
                duration: 2000,
                success: function () {
                  that.setData({
                    s1: true,
                    s2: false,
                  })
                }

              })
            }
            else if (res.data.code == 663) {
              var lg=1
              wx.showModal({
                title: '登录超时',
                content: '请重新登录',
                success:function(r){
                  if(r.confirm){
                    wx.reLaunch({
                      url: '../index/index?lg='+lg,
                    })
                  }
                }
              })
            }
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    console.log(options)
    this.setData({
      id:id,
      coverImg: options.coverImg
    })
    console.log(options.id)
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
    // }else{
    wx.request({
      url: getApp().globalData.url + '/api/article/article',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        // token:token,
        id: id
      },
      success: function (res) {
        console.log(res)
        if(res.data.code=='301'){
          wx.showModal({
            title: '未找到',
            content: '未找到该文章',
            success:function(r){
              if(r.confirm){
                wx.reLaunch({
                  url: '../index/index',
                })
              }else if(r.cancel){
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            }
          })
        }else{
        var favorite = res.data.data.favorite
          res.data.data.updateDate = Api.js_date_time(res.data.data.updateDate)     //对象时间戳转换    
        var da = res.data.data.content
        WxParse.wxParse('da', 'html', da, that, 5)
        if (favorite == false) {
          that.setData({
            s1: true,
            s2: false,
          })
        }
        else if (favorite == true) {
          that.setData({
            s1: false,
            s2: true,
          })
        }
        if (res.data.data.video!=''){
          that.setData({
            video:true
          })
        }
        that.setData({
          data:res.data.data
        })
      }
      }
    })
    // }
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
    var tit = this.data.data
    var coverImg = this.data.coverImg
    var id=this.data.id
    console.log(coverImg)
    return {
      title: tit.title,
      // path: '/pages/sparticularst/sparticularst?id='+id,
      imageUrl: getApp().globalData.url +'/'+ coverImg
    }
  }
})