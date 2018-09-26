// pages/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     s1: true, s2: false,
  winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    url: getApp().globalData.url,

    dataList:[],
    // timeList:[],
    commodityList: [],
    servicesList:[],
    dataList:'0',
    datas:'0',
    dates:'0',
    
   token:'',
    show:true,
    canh:false,

    url: getApp().globalData.url,

    hadLastPage: false,
    curpage: 1,
  },
  loading:function(){
    var hadLastPage = this.data.hadLastPage
    var page = this.data.curpage
    // console.log('********************' + hadLastPage)
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      });
      return;
    }
    var that = this;
    var token = this.data.token
    wx.request({
      url: getApp().globalData.url + '/api/commodity/list',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        token: token,
        page:page
      },
      success: function (res) {
        console.log(res)
        var listData = that.data.commodityList
        for (var i = 0; i < res.data.data.list.length; i++) {
          listData.push(res.data.data.list[i])
        }
        if (res.data.data.totalPage <= res.data.data.currentPage) {
          that.setData({
            hadLastPage: true
          })
        }
        else {
          wx.showToast({
            title: '加载中..',
            icon: 'loading',
            duration: 1000,
          })
          that.setData({
            curpage: page + 1
          })
        }
        that.setData({
          commodityList: listData
        })
      }
    })
  },

  currentTabs:function(e){
    var that=this
    console.log(e)
    var currentTab = e.detail.current
    this.setData({
      currentTab: e.detail.current
    })
    if (currentTab == 2) {
      wx.request({
        url: getApp().globalData.url + '/api/parentingClasses/classesList',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {},
        success: function (res) {
          console.log(res)
          // var timeList = []
          // for (var i in res.data.data) {
          //   timeList.push(res.data.data[i].times)
          // }
          // console.log(timeList)
          that.setData({
            // timeList: timeList,
            dataList: res.data.data,
          })
        }
      })
    }
    else if (currentTab == 1) {
      var token=this.data.token
      var page = this.data.curpage
      wx.request({
        url: getApp().globalData.url + '/api/commodity/list',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          token: token,
          page: 1
        },
        success: function (res) {
          console.log(res)         
          that.setData({
            curpage: page+1,
            commodityList: res.data.data.list
          })
        }
      })
     
    }
    else if (currentTab == 0) {
      wx.request({
        url: getApp().globalData.url + '/api/services/list',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          page: 1
        },
        success: function (res) {
          console.log(res)
          that.setData({
            servicesList: res.data.data.list
          })
        }
      })
    }
    else if (currentTab == 3) {
      wx.request({
        url: getApp().globalData.url + '/api/training/list',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {},
        success: function (res) {
          console.log(res)
          that.setData({
            peixunList: res.data.data
          })
        }
      })
    }
  

  },
  mrzd:function(e){
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
  
     wx.navigateTo({
       url: '../guidance/guidance?id='+id,
     })


   }
  },
  //  点击课程类别组件确定事件  
  bindDateChange: function (e) {
    console.log(e)
    var cl = parseInt(e.detail.value)+1
    // console.log(cl)
    this.setData({
      s1: false,
      s2: true,
      datas: e.detail.value,
      cl: cl,
    })
  },
  //  点击上课时间组件确定事件  
  bindSixChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      s1: false,
      s2: true,
      dates: e.detail.value
    })
  },
  babyMonthAge:function(e){
    // console.log(e)
    this.setData({
      babyMonthAge: e.detail.value
    })
  },
  listen_who: function (e) {
    // console.log(e)
    this.setData({
      listen_who: e.detail.value
    })
  },
  contactPhone: function (e) {
    // console.log(e)
    this.setData({
      contactPhone: e.detail.value
    })
  },
  tj:function(e){
    console.log(e)
    var sjcprice = e.currentTarget.id
    var that=this
    var classId = this.data.cl
    // console.log(classId)
    var classTimeIndex = this.data.dates
    var babyMonthAge = this.data.babyMonthAge
    var listen_who = this.data.listen_who
    var contactPhone = this.data.contactPhone
    if (babyMonthAge == "") {
      wx.showToast({
        title: '请输入月龄',
        image: '../../image/th.png',
        duration: 2000
      })
    }
    else if (babyMonthAge > 12) {
      wx.showToast({
        title: '输入正确月龄',
        image: '../../image/th.png',
        duration: 2000
      })
    }
    else if (listen_who == "") {
      wx.showToast({
        title: '请输入听课人',
        image: '../../image/th.png',
        duration: 2000
      })
    }
    // else if (!(/^1[34578]\d{9}$/.test(contactPhone))) {
    //   wx.showToast({
    //     title: '请输入电话',
    //     duration: 2000
    //   })
    // }
    else{ 
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
          url: getApp().globalData.url + '/api/parentingClasses/addApply',
          data: {
            token: token,
            classId: classId,
            classTimeIndex: classTimeIndex,
            babyMonthAge: babyMonthAge,
            listen_who: listen_who,
            contactPhone: contactPhone,
            check_price:sjcprice,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var orders=res.data.data
            if (res.data.code == 612) {
              wx.showModal({
                title: '提示',
                content: '用户未登录,请登录',
                success: function (res) {
                  console.log(res)
                  if (res.confirm) {
                    var lg = 1
                    wx.reLaunch({
                      url: '../index/index?lg=' + lg,
                    })
                  }

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
             else if (res.data.code==511){
                wx.showToast({
                  title: '您已预约',
                  image: '../../image/th.png',
                  duration:2000
                })
            }
            else if (res.data.code == 406) {
              wx.showToast({
                title: '时间已过期',
                image: '../../image/th.png',
                duration: 2000
              })
            }
           else if (res.data.message=='添加成功'){
            wx.showToast({
            title: '提交成功',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '../pay/pay?sjcprice=' + sjcprice + '&&orders=' + orders,
              })
            }
          })  
           }
          }
        })

      }
    
    }
  },
  tjgwc:function(e){
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
          url: getApp().globalData.url + '/api/commodity/addChart',
          data: {
            token: token,
            id:id,
            count: 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var lg=1
            if(res.data.code==612){
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
                    wx.reLaunch({
                      url: '../index/index?lg=' + lg,
                    })
                  }
                }
              })
            } 
            else if (res.data.code == 202){
              wx.showToast({
                title: '添加成功',
                duration:2000,
               
              })
            }
          }
        })
      }
    
  },
  jiarugwc: function (e) {
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
                duration:2000,
                success:function(){
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
  // 收藏
  sc: function (e) {
    var that = this
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
              content: '登录超时，请重新登录',
              success: function (r) {
                if (r.confirm) {
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
        }
      })
    }
  },
  /**
   * 选项卡
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
      var currentTab = e.target.dataset.current
      let that = this;
      if (currentTab == 2) {
        wx.request({
          url: getApp().globalData.url + '/api/parentingClasses/classesList',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {},
          success: function (res) {
            console.log(res)
            var timeList = []
            for (var i in res.data.data) {
              timeList.push(res.data.data[i].times)
            }
            // console.log(timeList)
            that.setData({
              timeList: timeList,
              dataList: res.data.data,
            })
          }
        })
      }
     else if (currentTab == 1) {
        var token = wx.getStorageSync('token')
        // console.log(token)
        if (token) {
          this.setData({
            token: token
          })
        }
        var token = this.data.token
        var page = this.data.curpage
        wx.request({
          url: getApp().globalData.url + '/api/commodity/list',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            token: token,
            page: 1
          },
          success: function (res) {
            console.log(res)
            that.setData({
              curpage: page+1,
              commodityList: res.data.data.list
            })
          }
        })
      }
      else if (currentTab == 0) {
        wx.request({
          url: getApp().globalData.url + '/api/services/list',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            page: 1
          },
          success: function (res) {
            console.log(res)
            that.setData({
              servicesList: res.data.data.list
            })
          }
        })
      }
      else if (currentTab == 3) {
        wx.request({
          url: getApp().globalData.url + '/api/training/list',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {},
          success: function (res) {
            console.log(res)
            that.setData({
              peixunList: res.data.data
            })
          }
        })
      }
    }
    
  },
  commodity:function(e){
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../commodity/commodity?id='+id,
    })
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
  particulars:function(e){
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../particulars/particulars?id='+id,
    })
  },
  pxxq:function(e){
    // console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../particularss/particularss?id='+id,
    })
  },
  addorder:function(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../addorder/addorder?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    // console.log(token)
    if (token) {
      this.setData({
        token: token
      })
    }
    wx.request({
      url: getApp().globalData.url + '/api/services/list',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        page:1
      },
      success: function (res) {
        console.log(res)
       
        that.setData({
          servicesList: res.data.data.list
        })
      }
    }) 
  },
  tolower:function(){
    this.loading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.loading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.loading();
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
    // this.loading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})