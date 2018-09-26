// pages/shippingInfo/shippingInfo.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'', phone:'', position:'',
  },
  name:function(e){
    this.setData({
      name: e.detail.value,
    })
  },
  phone: function (e) {
    // console.log(e)
    this.setData({
      phone: e.detail.value,
    })
  },
  position: function (e) {
    this.setData({
      position: e.detail.value,
    })
  },
  tj:function(){
    var name = this.data.name
    var phone = this.data.phone
    // console.log(phone)
    var position = this.data.position
    // var pos=this.data.pos
    // var names = pos.name
    // name = name==''?names:name
    if (name==''){
      this.wetoast.toast({
        title: '请填姓名',
        // image: '../../image/th.png',
        duration:2000,
      })
    }
    else if (phone == '') {
      this.wetoast.toast({
        title: '请填号码',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }
    else if (position == '') {
      this.wetoast.toast({
        title: '请填地址',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }else{
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/user/setShippingInfo',
            data: {
              token: res.data,
              name:name,
              phone: phone,
              position: position
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
                if(res.data.code==203){
                  wx.showToast({
                    title: '修改成功',
                    duration:2000,
                    success:function(){
                      wx.reLaunch({
                        url: '../my/my',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()
    var that=this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/getShippingInfo',
          data: {
            token: res.data,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
              that.setData({
                pos:res.data.data
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