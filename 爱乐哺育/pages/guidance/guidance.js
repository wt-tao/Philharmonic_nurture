// pages/guidance/guidance.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsList:[],
    marital: 1,
    price:'500',
    url: getApp().globalData.url,
    qysArray: ['到店服务', ],
    qyArray: ['到店服务','上门服务',],
    qy:'0',
    sqArray:[],
    qys:'0',
    id:'',
    adviserId:'',
    contact:'',
    contactPhone:'',
    service:[],
    color:'black',
    timesId:''
    
  },
 

  //  点击服务类型组件确定事件  
  bindQyChange: function (e) {
    // console.log(e.detail.value)
    // var price = e.currentTarget.id
    var qy = e.detail.value
    console.log(qy)
    if (qy == 0) {
      this.setData({
        qy: qy
      })
    } else  {
      this.setData({
        qy: qy
      })
    }
  },
  contact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  contactPhone: function (e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },
// 选择次数
  xzcs:function(e){
    console.log(e)
    var that=this
    var this_checked  = e.currentTarget.dataset.id
    var toDoorPrice = e.currentTarget.dataset.todoorprice
    console.log('toDoorPrice', toDoorPrice)
    var timesId = e.currentTarget.dataset.cs
    var price = e.currentTarget.id
    // const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let service = this.data.service; 
    for (var i = 0; i < service.length; i++) {
      if (service[i].id == this_checked) {
        console.log('true')
        service[i].checked = true;//当前点击的位置为true即选中
      }
      else {
        console.log('false')
        service[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      service: service,
      price: price,
      timesId: timesId,
      toDoorPrice: toDoorPrice
    })
  
  },
// 单选选择事件
  qx: function (e) {
    console.log(e)
    var service = e.currentTarget.dataset.service
    // service[0].checked = true
    // service[0].checked = true;
    // this.setData({
    //   service: this.data.service,
    // })//默认parameter数组的第一个对象是选中的
    var couldToDoor = e.currentTarget.id
    this.setData({
      service: service,
      couldToDoor: couldToDoor,
      
    })
    var cs=this.data.marital
    var ids = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let sqArray = this.data.sqArray;                    // 获取列表
    const selected = sqArray[index].selected;         // 获取当前的选中状态
    // sqArray[index].selected = !selected;              // 改变状态
    for (var i = 0; i < sqArray.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        sqArray[i].selected = true
      } else {
        sqArray[i].selected = false
      }
    }
    this.setData({
      sqArray: sqArray,
      ids: ids,
    });
  },
  // 购买
  tj:function(){
    var that=this
    var areaId=this.data.id
    var toDoorPrice = this.data.toDoorPrice
    var price = this.data.price//价格
    var types=this.data.qy //服务类型
    if(types==0){
      var toDoor=false
    }else{
      var toDoor = true,
        price = toDoorPrice
    }
    console.log(price)
    // var count_index = this.data.marital
    var timesId = this.data.timesId //次数id
   
    
    var contactName = this.data.contact//姓名
    var contactPhone = this.data.contactPhone//电话
    // console.log(price)
    if (timesId ==''){
      this.wetoast.toast({
        title: '请选择套餐，再选择次数',
        // image: '../../image/th.png',
        duration:2000,
      })
    }
    else if (contactName == '') {
      this.wetoast.toast({
        title: '请填写姓名',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }
    else if (contactPhone == '') {
      this.wetoast.toast({
        title: '请填写联系电话',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }
    else{
    wx.getStorage({
      key: 'token',
      success: function (res) {
    wx.request({
      url: getApp().globalData.url + '/api/services/submit',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        token:res.data, 
        // areaId: areaId,
        toDoor: toDoor,
        timesId: timesId,
        amountCheck: price,
        contactPhone: contactPhone,
        contactName: contactName
      },
      success: function (res) {
        console.log(res)
        var orders = res.data.data
        if(res.data.code=='511'){
          wx.showModal({
            title: '提示',
            content: '您已经购买该服务',
            success:function(r){
              if(r.confirm){
                // wx.navigateTo({
                //   url: '../addorder/addorder',
                // })
              }
            }
          })
        }else if (res.data.code == 663) {
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
        else{
          wx.showModal({
            title: '购买该服务',
            content: '您确定购买该服务吗？',
            success:function(re){
              if(re.confirm){
                wx.login({
                  success: function (res) {
                    console.log(res)
                    var code = res.code
                    wx.getStorage({
                      key: 'token',
                      success: function (res) {
                        wx.request({
                          url: getApp().globalData.url + '/api/orders/code;charset=utf-8',
                          data: {
                            token: res.data,
                            code: code,
                            ordersId: orders

                          },
                          header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                          },
                          method: 'POST',
                          success: function (res) {
                            console.log(res)
                            var ides = 2
                            let sesstion = res.data.data.session;
                            //微信支付
                            let timeStamp = res.data.data.timeStamp; //new Date().getTime(),
                            console.log(timeStamp)
                            let nonceStr = res.data.data.nonceStr;
                            let packaged = res.data.data.package;
                            let paySign = res.data.data.paySign;
                            wx.showToast({
                              title: '',
                              icon:'loading',
                              duration:2000,
                              success:function(){
                                wx.requestPayment({
                                  'timeStamp': timeStamp,
                                  'nonceStr': nonceStr, //随机字符串，长度为32个字符以下。
                                  'package': packaged,
                                  'signType': 'MD5',
                                  'paySign': paySign,
                                  'success': function (res) {
                                    wx.showToast({
                                      title: '支付成功',
                                      duration: 2000,
                                      success: function () {
                                        wx.redirectTo({
                                          url: '../my/my',
                                        })
                                      }
                                    })
                                  },
                                  'fail': function (res) { },
                                })
                              }
                            })                         
                          },
                          fail: function () { },
                          complete: function () { }
                        })
                      },
                    })
                  }
                })
              }
            }
          })
        
        }
      }
    })
      }
      })
    }
      
    
  },


  yuyue: function () {
    wx.reLaunch({
      url: '../subscribe/subscribe',
    })
  },
  index: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  active: function () {
    wx.reLaunch({
      url: '../active/active',
    })
  },
  cart: function () {
    wx.reLaunch({
      url: '../cart/cart',
    })
  },
  my: function () {
    wx.reLaunch({ 
      url: '../my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()

    var id=options.id
 
    var that=this
    wx.request({
      url: getApp().globalData.url + '/api/services/getCombo',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        id:id
      },
      success: function (res) {
        console.log(res)
        // var id = res.data.data[0].id
       
        that.setData({
          sqArray: res.data.data.serviceCombos,
          zy: res.data.data.noticeBeforeBuy,
          ck: res.data.data,
          
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