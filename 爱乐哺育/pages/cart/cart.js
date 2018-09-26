// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comd:true,
    fuw:false,
    token:'',
    totalPrice:0,
    commodity:[],
    chartIds_commodity:[],//商品id集合
    chartIds_training:[],//培训id集合
    url: getApp().globalData.url,
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    
    // totalPrice: 0, //总价，初始为0(培训)
    totalPrices: 0,          // 总价，初始为0(商品)
    counts:0,
    countt:0,

    // selectAllStatus: false,    // 全选状态，默认NO全选(培训) 
    selectAllStatuss: false    // 全选状态，默认NO全选(商品)
  },
  // currentTabs:function(e) {
  //   var that = this
  //   console.log(e)
  //   var currentTab = e.detail.current
  //   this.setData({
  //     currentTab: e.detail.current
  //   })
  //   if (currentTab == 0) { 
  //     wx.getStorage({
  //       key: 'token',
  //       success: function (res) {
  //         wx.request({
  //           url: getApp().globalData.url + '/api/chart/get',
  //           data: {
  //             token: res.data,
  //             type: 1
  //           },
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded' // 默认值
  //           },
  //           method: 'POST',
  //           success: function (res) {
  //             console.log(res)

  //             that.setData({
  //               commodity: res.data.data,
  //               comd: true,
  //               fuw: false,
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  //   else if (currentTab == 1) {
  //     wx.getStorage({
  //       key: 'token',
  //       success: function (res) {
  //         wx.request({
  //           url: getApp().globalData.url + '/api/chart/get',
  //           data: {
  //             token: res.data,
  //             type: 2
  //           },
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded' // 默认值
  //           },
  //           method: 'POST',
  //           success: function (res) {
  //             console.log(res)

  //             that.setData({
  //               training: res.data.data,
  //               comd: false,
  //               fuw: true,
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // 计算总价
  getTotalPrices() {
    let commodity = this.data.commodity;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < commodity.length; i++) {         // 循环列表得到每个数据
      if (commodity[i].selected) {                   // 判断选中才会计算价格
        total += commodity[i].count * commodity[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      commodity: commodity,
      totalPrices: total.toFixed(2)
    });
  },
 
  // 选择事件
  selectLists(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let commodity = this.data.commodity;                    // 获取购物车列表
    const selected = commodity[index].selected;         // 获取当前商品的选中状态
    commodity[index].selected = !selected;              // 改变状态

    var chartIds_commodity = []
    var chartIds_training = []
    for (var i = 0; i < commodity.length; i++) {
      if (commodity[i].selected == true) {
        if (commodity[i].type == 1) {
          chartIds_commodity.push(parseInt(commodity[i].chartId))
        }
        else if (commodity[i].type == 2) {
          chartIds_training.push(parseInt(commodity[i].chartId))
        }
      }
    }
    var counts = chartIds_training.lengt
    console.log(counts)
    console.log(chartIds_training)

    this.setData({
      commodity: commodity,
      chartIds_training: chartIds_training,
      chartIds_commodity: chartIds_commodity,
      counts:counts
    });
    this.getTotalPrices();                           // 重新获取总价
  },
  // 全选事件
  selectAlls(e) {
    let selectAllStatuss = this.data.selectAllStatuss;    // 是否全选状态
    selectAllStatuss = !selectAllStatuss;
    let commodity = this.data.commodity;

    for (let i = 0; i < commodity.length; i++) {
      commodity[i].selected = selectAllStatuss;            // 改变所有商品状态
    }

    var chartIds_commodity = []
    var chartIds_training = []
    for (var i = 0; i < commodity.length; i++) {
      if (commodity[i].selected == true) {
        if (commodity[i].type==1){
          chartIds_commodity.push(parseInt(commodity[i].chartId))
        }
        else if (commodity[i].type == 2){
          chartIds_training.push(parseInt(commodity[i].chartId))
        }
      }
    }
    // var counts = chartIds_commodity.length
    var counts = chartIds_training.length
     console.log(counts)
    console.log(chartIds_commodity)

    this.setData({
      counts: counts,
      chartIds_commodity: chartIds_commodity,
      chartIds_training: chartIds_training,
      selectAllStatuss: selectAllStatuss,
      commodity: commodity
    });
    this.getTotalPrices();                               // 重新获取总价
  },
  // 增加数量
  addCounts(e) {
    const index = e.currentTarget.dataset.index;
    let commodity = this.data.commodity;
    let count = commodity[index].count;
    count = count + 1;
    commodity[index].count = count;
    var chartId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/chart/count',
          data: {
            token: res.data,
            add: true,
            chartId: chartId
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
    this.setData({
      commodity: commodity
    });
    this.getTotalPrices();
  },
  // 减少数量
  minusCounts(e) {
    const index = e.currentTarget.dataset.index;
    let commodity = this.data.commodity;
    let count = commodity[index].count;
    if (count <= 1) {
      return false;
    }
    count = count - 1;
    commodity[index].count = count;
    var chartId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/chart/count',
          data: {
            token: res.data,
            add: false,
            chartId: chartId
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
    this.setData({
      commodity: commodity
    });
    this.getTotalPrices();
  },
  comditiy:function(e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../commodity/commodity?id=' + id,
    })
  },
// 培训
  // 计算总价
  getTotalPrice() {
    let training = this.data.training;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < training.length; i++) {         // 循环列表得到每个数据
      if (training[i].selected) {                   // 判断选中才会计算价格
        total += training[i].count * training[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      training: training,
      totalPrice: total.toFixed(2)
    });
  },
  // 选择事件
  selectList(e) {
    console.log(e)
    var id = e.currentTarget.id
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let training = this.data.training;                    // 获取购物车列表
    const selected = training[index].selected;         // 获取当前商品的选中状态
    training[index].selected = !selected;              // 改变状态

    var chartIds_training = []
    for (var i = 0; i < training.length; i++) {
      if (training[i].selected == true) {
        chartIds_training.push(parseInt(training[i].chartId))
      }
    }
    var countt = chartIds_training.length
    // console.log(countt)
    // console.log(chartIds_training)

    this.setData({
      countt: countt,
      chartIds_training:chartIds_training,
      training: training
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  // 全选事件
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let training = this.data.training;

    for (let i = 0; i < training.length; i++) {
      training[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    var chartIds_training = []
    for (var i = 0; i < training.length; i++) {
      if (training[i].selected == true) {
        chartIds_training.push(parseInt(training[i].chartId))
      }
    }
    var countt = chartIds_training.length
    // console.log(countt)
    console.log(chartIds_training)

    this.setData({
      chartIds_training: chartIds_training,
      countt: countt,
      selectAllStatus: selectAllStatus,
      training: training
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;
    let training = this.data.training;
    let count = training[index].count;
    count = count + 1;
    training[index].count = count;
    var chartId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/chart/count',
          data: {
            token: res.data,
            add: true,
            chartId: chartId
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
    this.setData({
      training: training
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let training = this.data.training;
    let count = training[index].count;
    if (count <= 1) {
      return false;
    }
    count = count - 1;
    training[index].count = count;
    var chartId = e.currentTarget.id
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/chart/count',
          data: {
            token: res.data,
            add: false,
            chartId: chartId
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
    this.setData({
      training: training
    });
    this.getTotalPrice();
  },

  /**
   * 选项卡
   */
  // swichNav: function (e) {
  //   var that = this;
  //   if (this.data.currentTab === e.target.dataset.current) {
  //     return false;
  //   } else {
  //     this.setData({
  //       currentTab: e.target.dataset.current,
  //     })
  //     var currentTab = e.target.dataset.current
  //     if (currentTab==0){
  //       wx.getStorage({
  //         key: 'token',
  //         success: function (res) {
  //           wx.request({
  //             url: getApp().globalData.url + '/api/chart/get',
  //             data: {
  //               token: res.data,
  //               type: 1
  //             },
  //             header: {
  //               'content-type': 'application/x-www-form-urlencoded' // 默认值
  //             },
  //             method: 'POST',
  //             success: function (res) {
  //               console.log(res)
              
  //               that.setData({
  //                 commodity: res.data.data,
  //                 comd: true,
  //                 fuw: false,
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }
  //    else if (currentTab == 1) {
  //       wx.getStorage({
  //         key: 'token',
  //         success: function (res) {
  //           wx.request({
  //             url: getApp().globalData.url + '/api/chart/get',
  //             data: {
  //               token: res.data,
  //               type: 2
  //             },
  //             header: {
  //               'content-type': 'application/x-www-form-urlencoded' // 默认值
  //             },
  //             method: 'POST',
  //             success: function (res) {
  //               console.log(res)

  //               that.setData({
  //                 training: res.data.data,
  //                 comd: false,
  //                 fuw: true,
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }
  //   }
  // },
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
  account:function(){
    var chartIds_commodity = this.data.chartIds_commodity
    var chartIds_training = this.data.chartIds_training
    var js=0
    console.log(chartIds_commodity)
    console.log(chartIds_training)
    if (chartIds_commodity == '' && chartIds_training==''){
       wx.showToast({
         title: '暂无商品可结算',
         image: '../../image/th.png',
         duration:2000,
       })
    }else{
      wx.navigateTo({
        url: '../account/account?chartIds_commodity=' + chartIds_commodity + '&&chartIds_training=' + chartIds_training+'&&js='+js,
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this
    var token=wx.getStorageSync('token')
    // console.log(token)
      if(token){
        this.setData({
          token: token
      })
      }
      var token=this.data.token
    if (token == '') {
      // console.log('asdfsfsdfsd')
      wx.showModal({
        title: '请先登录',
        content: '您还未登录，请先登录',
        success: function (r) {
          if (r.confirm) {
            var lg=1
            wx.reLaunch({
              url: '../index/index?lg='+lg,
            })
          }

        }
      })
    }
    else {
       wx.request({
         url: getApp().globalData.url + '/api/chart/get',
         data: {
           token: token,
           type:1
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
               title: '请先登录',
               content: '您还未登录，请先登录',
               success: function (r) {
                 if (r.confirm) {
                   wx.reLaunch({
                     url: '../index/index?lg='+lg,
                   })
                 }

               }
             })
           }
           else if (res.data.code == 663){  
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
           }else{
             var commodity =[]
             for (var i = 0;i<res.data.data.commodity.length;i++){
               commodity.push(res.data.data.commodity[i])
             }
             for (var j = 0; j < res.data.data.training.length; j++) {
               commodity.push(res.data.data.training[j])
             }
             console.log(commodity)
             that.setData({
               commodity: commodity
             }) 
           }
           
         }
       })

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