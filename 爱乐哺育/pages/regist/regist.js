// pages/regist/regist.js
var codes = require('../../utils/time.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2018-09-09',
    dates: '2018-09-09',
    phone:'',
    password:'', 
    psw_:'',
    yzm:'',
    sex:'',
    babySex:'',
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　
    name:'',
    age:'',
    contactPhone:'',
    show: true,
    show1: false,
    referralCode:'',

    position:'',
    s1: false, s2: true,
    s3: false, s4: true,
    b1: false, b2: true,
    b3: false, b4: true,
  },
  i1:function(e){
    this.setData({
      s1: false, s2: true,
      s3: false, s4: true,
    })
  },
  i2: function (e) {
    console.log(e)
    this.setData({
      sex: e.currentTarget.id,
      s1: true, s2: false,
      s3: false, s4: true,
    })
  },
  ic1: function () {
    // console.log(e)
    this.setData({
      s1: false, s2: true,
      s3: false, s4: true,
    })
  },
  ic2: function (e) {
    console.log(e)
    this.setData({
      sex: e.currentTarget.id,
      s1: false, s2: true,
      s3: true, s4: false,
    })
  },
 
  b1: function () {
    this.setData({
      b1: false, b2: true,
      b3: false, b4: true,
    })
  },
  b2: function (e) {
    console.log(e)
    this.setData({
      babySex: e.currentTarget.id,
      b1: true, b2: false,
      b3: false, b4: true,
    })
  },
  bc1: function () {
    this.setData({
      b1: false, b2: true,

      b3: false, b4: true,
    })
  },
  bc2: function (e) {
    console.log(e)
    this.setData({
      babySex: e.currentTarget.id,
      b1: false, b2: true,
      b3: true, b4: false,
    })
  },
 phone:function(e){
   console.log(e)
   this.setData({
     phone: e.detail.value
   })
  
 },
 yzm: function (e) {
   console.log(e)
   this.setData({
     yzm: e.detail.value
   })
 },
 password: function (e) {
   console.log(e)
   this.setData({
     password: e.detail.value
   })
 },
 psw_: function (e) {
   console.log(e)
   this.setData({
     psw_: e.detail.value
   })
 },
 referralCode: function (e) {
   console.log(e)
     this.setData({
       referralCode: e.detail.value
     })
 },
 getCode:function(){
   var phone = this.data.phone
   var _this = this;　　　　//防止this对象的混杂，用一个变量来保存

   var time = _this.data.sec　　//获取最初的秒数
   var phone = this.data.phone;
   codes.getCode(_this, time);　　//调用倒计时函数
   wx.request({
     url: getApp().globalData.url + '/api/getSms',
     method: "POST",
     header: {
       'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
     },
     data: {
       usedWay: 1,
       phone: phone,
     },
     success: function (res) {
       console.log(res)
       var message = res.message
       if (res.code == '647') {
         _this.wetoast.toast({
           title: '发送成功',
           duration:2000,
         })
       } else if(res.code=='646') {
         _this.wetoast.toast({
           title: '短信发送失败！',
           duration: 2000,
         })
       }
      //  else if (res.code == '646') {
      //    wx.showToast({
      //      title: '短信发送失败！',
      //      duration: 2000,
      //    })
      //  }
     }
   })
 },
 hha: function () {
   var phone=this.data.phone
   var sms_phone = this.data.yzm
   var psw = this.data.password
   var psw_ = this.data.psw_
   var referralCode = this.data.referralCode
   var that = this
  //  if (!(/^1[34578]\d{9}$/.test(phone))) {
  //    wx.showToast({
  //      title: '请输入正确号码',
  //      duration: 2000
  //    })
  //  }
  //  else
 
    if (sms_phone == '') {
      this.wetoast.toast({
        title: '请输入验证码',
        duration: 2000
      })
    }
    else if (psw == '') {
      this.wetoast.toast({
        title: '请输入密码',
        //  image: '../../image/th.png',
        duration: 2000
      })
    }
    else if (psw_ == '') {
      this.wetoast.toast({
        title: '请再次输入密码',
        //  image: '../../image/th.png',
        duration: 2000
      })
    }
   else if (psw_ != psw) {
      this.wetoast.toast({
       title: '请输入相同密码',
      //  image: '../../image/th.png',
       duration: 2000
     })
   }
    else if (sms_phone== '') {
      this.wetoast.toast({
        title: '请输入验证码',
        duration: 2000
      })
    }
 
   else {
   wx.login({
     success: function (res) {
      //  console.log(res)
       var code = res.code
       wx.request({
         url: getApp().globalData.url + '/api/login/reg',
         method: "POST",
         header: {
           'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
         },
         data: {
           code:code,
           phone: phone,
           sms_phone: sms_phone,
           psw: psw,
           psw_: psw_,
           referralCode: referralCode
         },
         success: function (res) {
           console.log(res)
           if (res.data.message == '该手机号已注册') {
             that.wetoast.toast({
               title: "该手机号已注册",
              //  image: '../../image/th.png',
               duration: 2000
             })
           }
           else if (res.data.code == '606') {
             that.wetoast.toast({
               title: "验证码错误",
              //  image: '../../image/th.png',
               duration: 2000
             })
           } else if (res.data.code == '607') {
             that.wetoast.toast({
               title: "发送频繁,稍候再试",
               //  image: '../../image/th.png',
               duration: 2000
             })
           } else if (res.data.code == '615') {
             that.wetoast.toast({
               title: "验证码失效",
               //  image: '../../image/th.png',
               duration: 2000
             })
           }
           else if (res.data.code == '603') {
             that.wetoast.toast({
               title: "密码过短，至少6位",
               //  image: '../../image/th.png',
               duration: 2000
             })
           }
           else if (res.data.code == '405') {
             that.wetoast.toast({
               title: "关键参数缺失",
               //  image: '../../image/th.png',
               duration: 2000
             })
           }
           else if (res.data.code=='625'){
             var token = res.data.data;
             wx.setStorage({
               key: 'token',
               data: res.data.data
             })
             
             console.log(token)
             that.wetoast.toast({
               title: "注册成功",
              //  image: '../../image/th.png',
               duration: 2000,
               success: function (res) {
             
                 that.setData({
                   token:token,
                   show: false,
                   show1: true
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
 name:function(e){
   console.log(e)
   this.setData({
     name: e.detail.value
   })
 },
 age: function (e) {
   console.log(e)
   this.setData({
     age: e.detail.value
   })
 },
 contactPhone:function (e) {
   console.log(e)
   this.setData({
     contactPhone: e.detail.value
   })
 },
 position: function (e) {
   console.log(e)
   this.setData({
     position: e.detail.value
   })
 },
 tj:function(){
 var name=this.data.name
 var sex = this.data.sex
 var babySex = this.data.babySex
 var age = this.data.age
 var dueDate_ = this.data.date
 var babyBirth_ = this.data.dates
 var contactPhone = this.data.contactPhone
 var position = this.data.position
 var that = this
 
 if (name == '') {
   this.wetoast.toast({
     title: '请输入姓名',
    //  image: '../../image/th.png',
     duration: 2000
   })
 }
//  else if (!(/^-?[1-9]\d*$/.test(sms_phone))) {
//    wx.showToast({
//      title: '请输入验证码',
//      duration: 2000
//    })
//  }
 else if (age=='') {
   this.wetoast.toast({
     title: '请输入年龄',
    //  image: '../../image/th.png',
     duration: 2000
   })
 }
 else if (contactPhone == '') {
   this.wetoast.toast({
     title: '请输入联系电话',
    //  image: '../../image/th.png',
     duration: 2000
   })
 } else if (sex == '') {
   this.wetoast.toast({
     title: '请选择您的性别',
    //  image: '../../image/th.png',
     duration: 2000
   })
 }
 else if (position == '') {
   this.wetoast.toast({
     title: '请输入邮寄位置',
    //  image: '../../image/th.png',
     duration: 2000
   })
 }else{
 wx.getStorage({
   key: 'token',
   success: function (res) {
     wx.request({
       url: getApp().globalData.url + '/api/login/setUserInfo',
       data: {
         token: res.data,
         name:name,
         age:age,
         dueDate_: dueDate_,
         babyBirth_: babyBirth_,
         sex: sex,
         contactPhone: contactPhone,
         position: position,
         babySex: babySex,
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
       },
       method: 'POST',
       success: function (res) {
         console.log(res)
         if (res.data.message == "修改成功"){
           that.wetoast.toast({
             title: '修改成功',
             duration: 2000,            
           })
           wx.reLaunch({
             url: '../index/index',
           })
         }
         if (res.data.code == "512") {
           that.wetoast.toast({
             title: '修改失败',
             duration: 2000,
           })
         
         }
       }
     })

   },
 })
 }
 },
 bindDateChange:function(e){
   this.setData({
     date: e.detail.value
   })
  },
 bindDatesChange: function (e) {
   this.setData({
     dates: e.detail.value
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
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
         },
      data: {
        phone: phone,
        usedWay: 1
      },
      success: function (res) {
        console.log(res.data);

      }
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