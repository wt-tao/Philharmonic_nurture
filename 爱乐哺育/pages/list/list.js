// pages/list/list.js
var Api = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalFlag: true,
    url: getApp().globalData.url,
    listArray:[],  
    objList:[],
    show1:true,
    show2:false,
    hadLastPage: false,
    curpage: 1,
  },
  particularst:function(e){
    var id = e.currentTarget.id
    var coverImg = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../sparticularst/sparticularst?id=' + id + '&&coverImg=' + coverImg, 
    })
  },

  onLoad: function (options) {
    console.log(options)
    var name=options.name
    var id=options.id
    this.setData({
      id:id
    })
    if(id==1){
      wx.setNavigationBarTitle({
        title: name+'文章列表',
      })
    }
    if (id == 2) {
      wx.setNavigationBarTitle({
        title: name + '文章列表',
      })
    }
    if (id == 3) {
      wx.setNavigationBarTitle({
        title: name + '文章列表',
      })
    }
    if (id == 4) {
      wx.setNavigationBarTitle({
        title: name + '文章列表',
      })
    }
    // console.log(options)
    // var that = this
    // wx.request({
    //   url: getApp().globalData.url + '/api/article/articleList',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
    //   },
    //   data: {
    //     menuId:id
    //   },
    //   success: function (res) {
    //     console.log(res)
      
    //     // var sjc = res.data.data.list.updateDate;
    //     //   console.log(sjc)
    //     //数组时间戳转换   
    //     var ARR_NEWS_DATA=[]
    //     for (var i = 0; i < res.data.data.list.length; i++) {
    //       res.data.data.list[i].updateDate = Api.js_date_time(res.data.data.list[i].updateDate) 
    //       ARR_NEWS_DATA.push(res.data.data.list[i])
    //     } 
    //     console.log(ARR_NEWS_DATA)
    //     that.setData({
    //      listArray:res.data.data.list,
    //      objList: res.data.data.obj,
    //     })
    //   }
    // })
  },
  // 搜索
  ins:function(e){
    var id=this.data.id
    var key=this.data.inp
    this.setData({
      show1: false,
      show2: true,
    })
    var that = this
    wx.request({
      url: getApp().globalData.url + '/api/article/articleList',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        menuId: id,
        key: key
      },
      success: function (res) {
        console.log(res)
          
        // var sjc = res.data.data.list.updateDate;
        //   console.log(sjc)
        //数组时间戳转换   
        var ARR_NEWS_DATA = []
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].updateDate = Api.js_date_time(res.data.data.list[i].updateDate)
          ARR_NEWS_DATA.push(res.data.data.list[i])
        }
        console.log(ARR_NEWS_DATA)
        that.setData({
          listArrays: res.data.data.list,
          // objLists: res.data.data.obj,
        })
        if(res.data.data.list.length==0){
          wx.showToast({
            title: '搜索为空',
            icon:'loading',
            duration:2000,
          })
        }
      }
    })
  },
  inp:function(e){
    this.setData({
      inp: e.detail.value
    })
  },
  obj:function(e){
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../sparticularst/sparticularst?id=' + id,
    })
  },
  loading: function () {
    var id = this.data.id
    var hadLastPage = this.data.hadLastPage
    var curpage = this.data.curpage
    // console.log('********************' + hadLastPage)
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      });
      return;
    }
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api/article/articleList',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        page: curpage,
        menuId: id
      },
      success: function (res) {
        console.log(res)
        // var sjc = res.data.data.list.updateDate;
        //   console.log(sjc)
        //数组时间戳转换   
        var ARR_NEWS_DATA = []
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].updateDate = Api.js_date_time(res.data.data.list[i].updateDate)
          ARR_NEWS_DATA.push(res.data.data.list[i])
        }
        console.log(ARR_NEWS_DATA)

        var listData = that.data.listArray
        for (var i = 0; i < res.data.data.list.length; i++) {
          listData.push(res.data.data.list[i])
        }
        if (res.data.data.totalPage == res.data.data.currentPage) {
          that.setData({
            hadLastPage: true
          })
        } else {
          wx.showToast({
            title: '加载中..',
            icon: 'loading',
            duration: 1000,
          })
          that.setData({
            curpage: curpage + 1
          })
        }

        that.setData({
          listArray: listData,
          objList: res.data.data.obj,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loading();
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
    this.loading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})