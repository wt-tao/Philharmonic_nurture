// pages/particularss/particularss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    token:'',
  },
  gm: function (e) {
    console.log(e)
    var id = e.currentTarget.id
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
    var types = 2
    var js = 1
    wx.navigateTo({
      url: '../account/account?id=' + id + '&&js=' + js + '&&types=' + types,
    })
    }
  },
  // 加入购物车
  jiarugwc:function(e){
    console.log(e)
    var id = e.currentTarget.id
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
          url: getApp().globalData.url + '/api/training/addChart',
          data: {
            token: token,
            id: id,
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
            else if (res.data.code == 202) {
              wx.showToast({
                title: '添加成功',
                duration: 2000
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
  //  console.log(options)
  var that=this
   var id=options.id
   wx.request({
     url: getApp().globalData.url + '/api/training/detail',
     method: "POST",
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     data: {
       id:id
     },
     success: function (res) {
       console.log(res)
       that.setData({
         xq: res.data.data
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
    var xq = this.data.xq
    return {
      title: xq.name+'课程详情',
      // path: '/pages/sparticularst/sparticularst?id='+id,
      imageUrl: getApp().globalData.url + '/' + xq.img
    }
  }
})