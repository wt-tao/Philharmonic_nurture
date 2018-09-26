// pages/addorder/addorder.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    storeId:'1',
    contact:'',
    contactPhone:'',
    leaveMessage:'',
    year:'2018',
    qsex1:'',
    qsex:'',
    sexArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ],
    sex: '0',
    sexArray1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',],
    sex1: '0',
    timeArray: ['上午（8：00~10：00）', '上午（10：00~12：00）', '下午（12：00~14：00）', '下午（14：00~16：00）', '下午（16：00~18：00）', '下午（18：00~20：00）', '下午（20：00~22：00）', '下午（22：00~24：00）'],
    time:'0',
    dianArray: [],
    dian: '0',
    token:'',
  },
  //  点击门店组件确定事件  
  binddianChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      dian: e.detail.value,
      storeId: this.data.dianArray[e.detail.value].id
    })
    console.log(this.data.dianArray[e.detail.value].id)
  },
  //  点击时间段组件确定事件  
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindSixChange: function (e) {
    // console.log(e.detail.value)
    var qsex = parseInt(e.detail.value)
    qsex=qsex+1
    console.log(qsex)
    this.setData({
      sex: e.detail.value,
      qsex: qsex
    })
  },
  bindSix1Change: function (e) {
    // console.log(e.detail.value)
    var qsex1 = parseInt(e.detail.value)
    qsex1 = qsex1 + 1
    console.log(qsex1)
    this.setData({
      sex1: e.detail.value,
      qsex1: qsex1
    })
  },
  year: function (e) {
    this.setData({
      year: e.detail.value
    })
  },
  contact:function(e){
    this.setData({
      contact: e.detail.value
    })
  },
  contactPhone: function (e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },
  leaveMessage: function (e) {
    this.setData({
      leaveMessage: e.detail.value
    })
  },
  tj:function(){
    var that=this
    var contact = this.data.contact
    var contactPhone = this.data.contactPhone
    var leaveMessage = this.data.leaveMessage //备注
    var year = this.data.year //年
    var qsex = this.data.qsex //月
    var qsex1 = this.data.qsex1 //日
    var time=this.data.time
    if(time==0){
      time=time+8
    }
    if (time == 1) {
      time =  10
    }
    if (time == 2) {
      time = 12
    }
    if (time == 3) {
      time =  14
    }
    if (time == 4) {
      time = time + 16
    }
    if (time == 5) {
      time =  18
    }
    if (time == 6) {
      time = 20
    }
    if (time == 7) {
      time =  22
    }
    var appointmentTime_str = year + '-' + qsex + '-' + qsex1+' '+time+':00:00'
    console.log(appointmentTime_str)
    var storeId = this.data.storeId//门店id
    if (contact==''){
      this.wetoast.toast({
        title: '请填写联系人',
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
    else if (year == '') {
      this.wetoast.toast({
        title: '请填写年份',
        // image: '../../image/th.png',
        duration: 2000,
      })
    } else if (qsex == '') {
      this.wetoast.toast({
        title: '请填写月份',
        // image: '../../image/th.png',
        duration: 2000,
      })
    } else if (qsex1 == '') {
      this.wetoast.toast({
        title: '请填写几号',
        // image: '../../image/th.png',
        duration: 2000,
      })
    }else{
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/services/makeAppointment_breastFeedGuide',
            data: {
              token: res.data,
              contact:contact,
              contactPhone: contactPhone,
              leaveMessage: leaveMessage,
              appointmentTime_str: appointmentTime_str,
              storeId: storeId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if(res.data.code=='202'){
                wx.showModal({
                  title: '预约成功',
                  content: '您已预约成功，快去我的服务看看吧',
                  success:function(r){
                    if(r.confirm){
                      wx.navigateTo({
                        url: '../my/my',
                      })
                    }
                  }
                })
              }
              else if (res.data.code == '406') {
                wx.showModal({
                  title: '还有预约未完成',
                  content: "还有预约未完成，请完成之后再进行下一次预约",
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
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
  // 产后康复预约
  tjs: function () {
    var that = this
    var contact = this.data.contact
    var contactPhone = this.data.contactPhone
    var leaveMessage = this.data.leaveMessage //备注
    var year = this.data.year //年
    var qsex = this.data.qsex //月
    var qsex1 = this.data.qsex1 //日
    var appointmentTime_str = year + '-' + qsex + '-' + qsex1 + ' ' + '10:00:00'
    console.log(appointmentTime_str)
    var storeId = this.data.storeId//门店id
    if (contact == '') {
      this.wetoast.toast({
        title: '请填写联系人',
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
    else if (year == '') {
      this.wetoast.toast({
        title: '请填写年份',
        // image:'../../image/th.png',
        duration: 2000,
      })
    } else if (qsex == '') {
      this.wetoast.toast({
        title: '请填写月份',
        // image: '../../image/th.png',
        duration: 2000,
      })
    } else if (qsex1 == '') {
      this.wetoast.toast({
        title: '请填写几号',
        // image: '../../image/th.png',
        duration: 2000,
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/services/makeAppointment_postRehabilitation',
            data: {
              token: res.data,
              contact: contact,
              contactPhone: contactPhone,
              leaveMessage: leaveMessage,
              appointmentTime_str: appointmentTime_str,
              storeId: storeId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.code == '202') {
                wx.showModal({
                  title: '预约成功',
                  content: '您已预约成功，快去我的服务看看吧',
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
                      })
                    }
                  }
                })
              }
              else if (res.data.code == '406'){
                wx.showModal({
                  title: '还有预约未完成',
                  content: "还有预约未完成，请完成之后再进行下一次预约",
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
                      })
                    }
                  }
                })
              }
              else if (res.data.code == '406') {
                wx.showModal({
                  title: '还有预约未完成',
                  content: "还有预约未完成，请完成之后再进行下一次预约",
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
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
    wx.navigateTo({
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
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })
    var that=this
    var types = options.types
    var id=options.id
    this.setData({
      id:id
    })
    if(types=='0'){
      this.setData({
        show:true
      })
      wx.setNavigationBarTitle({
        title: '母乳指导预约'//页面标题为路由参数
      })
    }
    if (types == '1') {
      this.setData({
        show:false
      })
    }
    if (id == 2) {
      wx.setNavigationBarTitle({
        title: '母乳指导预约（到店）'//页面标题为路由参数
      })
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
            url: getApp().globalData.url + '/api/services/makeAppointment_breastFeedGuide_pageData',
            data: {
              token: token,
            
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              var lg = 1
              if (res.data.code == 612) {
                wx.showModal({
                  title: '请登录',
                  content: '您还未登录，请先登录',
                  success:function(r){
                    if(r.confirm){
                      wx.reLaunch({
                        url: '../index/index?lg=' + lg,
                      })
                    }
                  }
                })

              }
              if (res.data.code == '301') {
                wx.showModal({
                  title: '还未购买',
                  content: '您还未购买该服务，请先购买',
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../guidance/guidance',
                      })
                    } if (r.cancel) {
                      wx.reLaunch({
                        url: '../subscribe/subscribe',
                      })
                    }
                  }
                })
              } if (res.data.code == 663) {
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
              else if (res.data.code == '406') {
                wx.showModal({
                  title: '预约未完成',
                  content: "还有预约未完成，请完成之后再进行下一次预约",
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
                      })
                    } if (r.cancel) {
                      wx.reLaunch({
                        url: '../subscribe/subscribe',
                      })
                    }
                  }
                })
              }else{
                var num = res.data.data.count_all
                var nums = 1;
                for (var i = 0; i < num; i++) {
                  nums++
                }

                that.setData({
                  dianArray: res.data.data.storeList,
                  count_all: res.data.data.count_all,
                  count_make: res.data.data.count_make,
                  nums: nums
                })
              }
             
            
            }
          })
        }
     
    }
    else if (id == 1) {
      wx.setNavigationBarTitle({
        title: '产后康复预约'//页面标题为路由参数
      })
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
              var lg = 1
              wx.reLaunch({
                url: '../index/index?lg=' + lg,
              })
            }

          }
        })
      }
      else {
          wx.request({
            url: getApp().globalData.url + '/api/services/makeAppointment_postRehabilitation_pageData',
            data: {
              token: token,

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

              } if (res.data.code == 663) {
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
              if (res.data.code == '301') {
                wx.showModal({
                  title: '还未购买',
                  content: '您还未购买该服务，请先购买',
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../recovery/recovery',
                      })
                    }if(r.cancel){
                      wx.reLaunch({
                        url: '../subscribe/subscribe',
                      })
                    }
                  }
                })
              }
              if (res.data.code == '406') {
                wx.showModal({
                  title: '还有预约未完成',
                  content: "还有预约未完成，请完成之后再进行下一次预约",
                  success: function (r) {
                    if (r.confirm) {
                      wx.navigateTo({
                        url: '../my/my',
                      })
                    } if (r.cancel) {
                      wx.reLaunch({
                        url: '../subscribe/subscribe',
                      })
                    }
                  }
                })
              }
              if (res.data.code == 663) {
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
              else {
              var num = res.data.data.count_all
              var nums = 1;
              for (var i = 0; i < num; i++) {
                nums++
              }
              that.setData({
                dianArray: res.data.data.storeList,
                count_all: res.data.data.count_all,
                count_make: res.data.data.count_make,
                nums: nums
              })
              }
            }
          })
        }
      
    }
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