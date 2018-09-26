const app = getApp()
// pages/changepassword/changepassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  tj:function(){
    var that = this
    var oldPsw = this.data.oldPsw
    var newPsw = this.data.newPsw
    var newPsw_ = this.data.newPsw_
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/changePsw',
          data: {
            token: res.data,
            oldPsw: oldPsw,
            newPsw: newPsw,
            newPsw_: newPsw_,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
          if(res.data.code==603){
            that.wetoast.toast({
              title: '密码错误',
              // image: '../../image/th.png',
              duration:2000,
            })
          }
          else if (res.data.code == 203){
            wx.showToast({
              title: '修改成功',
              duration: 2000,
              success:function(){
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
          }
          else if (res.data.code == 643) {
            that.wetoast.toast({
              title: '密码不一致',
              // image: '../../image/th.png',
              duration: 2000,
            })
          }
          }
        })
      }
    })
    // wx.reLaunch({
    //   url: '../my/my',
    // })
  },
  oldPsw:function(e){
    this.setData({
      oldPsw: e.detail.value
    })
    
  },
  newPsw: function (e) {
    this.setData({
      newPsw: e.detail.value
    })

  },
  newPsw_: function (e) {
    this.setData({
      newPsw_: e.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()
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