// pages/datum/datum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    dates: '1990-06-15',
   sexArray:['女','男'],
    sex:'0',
    rq1:true,
    rq2:false,
    sex1: true,
    sex2: false,
  },
  imgesa:function(){
    // console.log('++++++++++++++++++++++')
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (ss) {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            console.log(res.tempFilePaths[0])
            console.log(res.tempFilePaths)
            var tempFilePaths = res.tempFilePaths[0]
            wx.uploadFile({
              url: getApp().globalData.url + '/api/user/setInfo',
              
              filePath: tempFilePaths,
              name: 'headImg_',
              formData: {
                token: ss.data,
                headImg_: tempFilePaths
              },   
              success: function (res) {
                console.log(res);
                wx.getStorage({
                  key: 'token',
                  success: function (res) {
                    wx.request({
                      url: getApp().globalData.url + '/api/user/userInfo',
                      data: {
                        token: res.data,

                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      method: 'POST',
                      success: function (res) {
                        console.log(res)
                        var sex = res.data.data.sex
                        if (sex == false) {
                          sex = '女'
                        } else {
                          sex = '男'
                        }
                        // res.data.data.createDate = Api.js_date_time(res.data.data.createDate)     //对象时间戳转换
                        that.setData({
                          sex: sex,
                          my: res.data.data
                        })
                      }
                    })
                  }
                })

                
              }
            })
          }
        })
      },
    })
  },
  //  点击性别组件确定事件  
  bindSixChange: function (e) {
    var sex = e.detail.value
    this.setData({
      sex1: false,
      sex2: true,
      sex: e.detail.value
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/setInfo',
          data: {
            token: res.data,
            sex: sex
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)

          }
        })
      }
    })
  },
  age: function (e) {
    var that = this
    var age = e.detail.value
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/setInfo',
          data: {
            token: res.data,
            age: age
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)

          }
        })
      }
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    var babyBirth = e.detail.value
    this.setData({
      rq1: false,
      rq2: true,
      dates: e.detail.value
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/setInfo',
          data: {
            token: res.data,
            babyBirth: babyBirth
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)

          }
        })
      }
    })
  },
  name:function(){
  wx.navigateTo({
    url: '../name/name',
  })
  },
  changepassword:function(){
    wx.navigateTo({
      url: '../changepassword/changepassword',
    })
  },
  nickname :function(e) {
    var that = this
    var nickname = e.detail.value
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/setInfo',
          data: {
            token: res.data,
            nickname: nickname
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
  
          }
        })
      }
    })
  },
  contactPhone: function (e) {
    var that = this
    var contactPhone = e.detail.value
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/user/setInfo',
          data: {
            token: res.data,
            contactPhone: contactPhone
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)

          }
        })
      }
    })
  },
  position: function () {
   wx.navigateTo({
     url: '../shippingInfo/shippingInfo',
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
          url: getApp().globalData.url + '/api/user/userInfo',
          data: {
            token: res.data,

          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res) 
            var sex = res.data.data.sex
            if(sex==false){
              sex='女'
            }else{
              sex = '男'
            }
            // res.data.data.createDate = Api.js_date_time(res.data.data.createDate)     //对象时间戳转换
            that.setData({
              sex:sex,
              my: res.data.data
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