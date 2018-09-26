// pages/commodity/commodity.js
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    url: getApp().globalData.url,
 
    swiperCurrent: 0,
    s1: true, s2: false,
    // imgst:[],
    index:0,
    token:'',
    specifications:[],
    price:'',
    integralPrice:'',
    
  },

  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  tjgwc: function (e) {
    console.log(e)
    var token=this.data.token
    var id = e.currentTarget.id
    if (token == '') {
      // console.log('asdfsfsdfsd')
      wx.showModal({
        title: '请先登录',
        content: '您还未登录，请先登录',

        success:function(r){
          if(r.confirm){
            wx.reLaunch({
              url: '../index/index',
            })
          }
         
        }
      })
    }
else{     
        wx.request({
          url: getApp().globalData.url + '/api/commodity/addChart',
          data: {
            token: token,
            id: id,
            count: 1
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
                image: '../../image/th.png',
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
  gm:function(e){
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
    }else{
    var types=1
    var js=1
    wx.navigateTo({
      url: '../account/account?id='+id+'&&js='+js+'&&types='+types,
    })
    }
  },
  // 收藏
  sc: function (e) {
    var that = this
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
          url: getApp().globalData.url + '/api/user/favorite',
          data: {
            token: token,
            id: id,
            type: 1,
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
                image: '../../image/th.png',
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
          }
        })
      }
  },
  sc1: function (e) {
    var that = this
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
          url: getApp().globalData.url + '/api/user/favorite',
          data: {
            token:token,
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
             else if (res.data.code == 203) {
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
          }
        })
    }
  },
  quy:function(e){
    var that=this
    console.log(e)
    var price = e.currentTarget.dataset.price
    var ids = e.currentTarget.dataset.id
    var id = e.currentTarget.id
    var integralPrice = e.currentTarget.dataset.integralprice
    let specifications = this.data.specifications
    // for (var i = 0; i < specifications.length; i++) {
    //   if (specifications[i].id == this_checked) {
    //     console.log('true')
    //     specifications[i].checked = true;//当前点击的位置为true即选中
    //   }
    //   else {
    //     console.log('false')
    //     specifications[i].checked = false;//其他的位置为false
    //   }
    // }
    // wx.navigateTo({
    //   url: '../commodity/commodity?id='+id,
    // })
    var token = this.data.token
    //  var token = this.data.token
    wx.request({
      url: getApp().globalData.url + '/api/commodity/detail',
      data: {
        token: token,
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        var favorite = res.data.data.favorite
        var img = res.data.data.imgs
        var imgss = img.split(',')

        console.log(imgss)
        res.data.data.imgs = imgss
        console.log(res)
        var da = res.data.data.detail
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
        that.setData({
          commodit: res.data.data,
          specifications: res.data.data.specifications,
          ids:id
        })

      }
    })
    that.setData({
      ids:ids,
      specifications: specifications,
      price: price,
      integralPrice: integralPrice,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var id=options.id
    this.setData({
      ids:id
    })
    console.log(id)
   var that=this
   var token = wx.getStorageSync('token')
   // console.log(token)
   if (token) {
     this.setData({
       token: token
     })
   }
   var token = this.data.token
  //  var token = this.data.token
       wx.request({
         url: getApp().globalData.url + '/api/commodity/detail',
         data: {
           token: token,
          id:id
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // 默认值
         },
         method: 'POST',
         success: function (res) {
           console.log(res)
           var favorite = res.data.data.favorite
           var img=res.data.data.imgs
           var imgss=img.split(',' )
            
           console.log(imgss)
           res.data.data.imgs = imgss
           console.log(res)
           var da = res.data.data.detail
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
           that.setData({
             commodit:res.data.data,
             specifications: res.data.data.specifications, 
           })
          
         }
       })
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.data.specifications[0].checked=true
    // this.setData({
    //   specifications: this.data.specifications
    // })
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
    var commodit = this.data.commodit
    return {
      title: commodit.name+'详情',
      // path: '/pages/sparticularst/sparticularst?id='+id,
      imageUrl: getApp().globalData.url + '/' + commodit.imgs[0]
    }
  }
})