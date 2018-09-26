// pages/active/active.js
var Api = require("../../utils/sjc.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    list:[],
    lists:[],
    obj:[],
    s1:false,

    show1:true,
    show2:false,

    hadLastPage: false,
    curpage: 1,
    curpages: 1,

    leftHeight: 0,
    rightHeight: 0,
    length: 10,
    pageNo: 1,
    descHeight: 30, //图片文字描述的高度
    pageStatus: true
  },

  obj: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var coverImg = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../act_sparticularst/act_sparticularst?id=' + id + '&&coverImg=' + coverImg,
    })
  },

  seek_input: function (e) {
    console.log(e)
    this.setData({
      seek_input: e.detail.value
    })
  },
  seek: function (e) {
    this.setData({
      show1: false,
      show2: true,
    })
    var key = this.data.seek_input
    // var hadLastPage = this.data.hadLastPage
    var curpage = this.data.curpages
    var that = this;
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      });
      return;
    }
    wx.request({
      url: getApp().globalData.url + '/api/video/list',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        key: key,
        curpage: curpage
      },
      success:function(res){
        console.log(res)
        if (res.data.data.list.length==0){
          wx.showToast({
            title: '搜索不到数据',
            icon:'loading',
            duration:2000,
          })
        }
        if (res.data.data.list.length==1){
          res.data.data.list[0].id=6
        }
        else{   
        var listData = that.data.lists
        for (var i = 0; i < res.data.data.list.length; i++) {
          listData.push(res.data.data.list[i])
        }
        if (res.data.data.totalCount == res.data.data.totalPage) {
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
            curpage: curpage + 1
          })
        }
        that.setData({
          lists: res.data.data.list
        })
      }
      }
    })
  },
   list:function(e){
     var id = e.currentTarget.id
     var coverImg = e.currentTarget.dataset.img
     wx.navigateTo({
       url: '../act_sparticularst/act_sparticularst?id=' + id + '&&coverImg=' + coverImg,
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  loading: function () {
    var s1=this.data.s1
    var hadLastPage = this.data.hadLastPage
    var curpage = this.data.curpage
    console.log('curpage', curpage)
    // console.log('********************' + hadLastPage)
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      });
      return;
    }
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api/video/list',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: { 
        page: curpage
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.obj.length==0){
          that.setData({
            s1:false
          })
        }else{
          that.setData({
            s1: true
          })
        }
        var listData = that.data.list
        for (var i = 0; i < res.data.data.list.length; i++) {
          listData.push(res.data.data.list[i])
        }
        if (res.data.data.currentPage == res.data.data.totalPage) {
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
        var ARR_NEWS_DATA = []
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].createDate = Api.js_date_time(res.data.data.list[i].createDate)
          ARR_NEWS_DATA.push(res.data.data.list[i])
        }
        var ARR_NEWS_DATAs = []
        for (var i = 0; i < res.data.data.obj.length; i++) {
          res.data.data.obj[i].createDate = Api.js_date_time(res.data.data.obj[i].createDate)
          ARR_NEWS_DATAs.push(res.data.data.obj[i])
        }
        that.setData({
          list: listData,
          obj: res.data.data.obj
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