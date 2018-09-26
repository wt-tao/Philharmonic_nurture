// pages/password/password.js
var codes = require('../../utils/time.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　
    show:true,
    show1:false,
    phone:'',
    sms:'',
  },
  hha:function(){
    var that=this
    var phone=this.data.phone
    var sms = this.data.sms
    if(phone==''){
      this.wetoast.toast({
        title: '请输入手机号码',
        // image: '../../image/th.png',
        duration: 2000
      })
    }
    else if(sms==''){
      this.wetoast.toast({
        title: '请输入验证码',
        // image: '../../image/th.png',
        duration: 2000
      })
    }
    else{

    // this.setData({
    //   show:false,
    //   show1: true
    // })
        wx.request({
          url: getApp().globalData.url + '/api/login/findPsw_check',
          data: {
            phone: phone,
            sms: sms
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if(res.data.code==641){
              that.setData({
                show: false,
                show1: true
              })
              wx.setStorage({
                key: 'newToken',
                data: res.data.data
              })
            } else if (res.data.code == 606){
              that.wetoast.toast({
                title: '验证码错误',
                // image: '../../image/th.png',
                duration:2000,
              })
            }
            else if (res.data.code == 615) {
              that.wetoast.toast({
                title: '请获取验证码',

                // image: '../../image/th.png',
                duration: 2000,
              })
            }
          }
        })

    }
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })

  },
  sms: function (e) {
    this.setData({
      sms: e.detail.value
    })

  },
  getCode: function () {
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
   
    var time = _this.data.sec　　//获取最初的秒数
    var phone = this.data.phone;
    codes.getCode(_this, time);　　//调用倒计时函数

    wx.request({
      url: getApp().globalData.url + "/api/getSms",
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        phone: phone,
        usedWay: 2
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 647) {
          _this.wetoast.toast({
            title: "发送成功",
            // image: '../../image/th.png',
            duration: 2000,
          })
        }
      else if(res.data.code==644){
          _this.wetoast.toast({
           title: "请求频繁，请稍候再试",
          //  image: '../../image/th.png',
           duration:2000,
         })
       }
      }
    })

  },
  psw_new: function (e) {
    // console.log(e)
    this.setData({
      psw_new: e.detail.value
    })
  },
  psw_new_: function (e) {
    // console.log(e)
    this.setData({
      psw_new_: e.detail.value
    })
  },
  tj:function(){
    var that=this
    var psw_new = this.data.psw_new
    var psw_new_ = this.data.psw_new_
    wx.getStorage({
      key: 'newToken',
      success: function(res) {
        wx.request({
          url: getApp().globalData.url + '/api/login/findPsw_reset',
          data: {
            newToken: res.data,
            psw_new: psw_new,
            psw_new_: psw_new_
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if (res.data.code == 406) {
              that.setData({
                show: true,
                show1: false
              })
            }
            else if (res.data.code == 203) {
              var lg=1
              that.wetoast.toast({
                title: '修改成功',
                duration: 2000,
                success:function(){
                  wx.navigateTo({
                    url: '../index/index?lg='+lg,
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
      },
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