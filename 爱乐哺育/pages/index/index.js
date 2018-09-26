//index.js
//获取应用实例
const app = getApp()
var Api = require("../../utils/sjc.js"); 
Page({
  data: {
    modalFlag:true,
    seek_input:'请输入关键字',
    // token:'',
    url: getApp().globalData.url,
    mainList:[],
    bannerList:[],
    articleList:[],
    phone:'',
    psw:'',
  },
  password:function(){
      wx.navigateTo({
        url: '../password/password',
      })
  },
  regist:function(){
    wx.navigateTo({
      url: '../regist/regist',
    })
  },


  seek_input:function(e){
    console.log(e)
    this.setData({
      seek_input: e.detail.value
    })
  },
  seek:function(e){
    // var type = e.currentTarget.id
    // var key = this.data.seek_input
    // wx.navigateTo({
    //   url: '../seek/seek?key='+key+'&&type='+type,
    // })
    wx.navigateTo({
      url: '../seek/seek',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()
    var that = this
    var lg = options.lg
    console.log('++++++++' + lg)
    if (lg == 1) {
      this.setData({
        modalFlag: false
      })
    }else{
    // console.log(options)   
    var token=this.data.token
    wx.getStorage({
      key: 'token',
      success: function (res) {
        if(token=res.data){
          that.setData({
            modalFlag:true
          })
        }
      }
    })
  }
      
      wx.request({
        url: getApp().globalData.url +'/api/main/main',
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        data:{},
        success:function(res){
          console.log(res)
          var ARR_NEWS_DATA = []
          for (var i = 0; i < res.data.data.articleList.length; i++) {
            res.data.data.articleList[i].createDate = Api.js_date_time(res.data.data.articleList[i].createDate)
            ARR_NEWS_DATA.push(res.data.data.articleList[i])
          } 
          that.setData({
            mainList: res.data.data.articleMenu,
            bannerList: res.data.data.banner,
            articleList: res.data.data.articleList
          })
        }
      })
  },
  confirm:function(){
    this.setData({
      modalFlag: true,
    })
  },
  yuyue:function(){
    wx.reLaunch({
      url: '../subscribe/subscribe',
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
  wenzhang:function(e){
    console.log(e)
    var id = e.currentTarget.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../list/list?id='+id+'&&name='+name,
    })
  },
  // 瀑布流
  list: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var coverImg = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../sparticularst/sparticularst?id=' + id + '&&coverImg=' + coverImg, 
         })
  },
  // banner
  banner:function(e){
    console.log(e)
    var id = e.currentTarget.id
    if(id!='-1'){
       wx.navigateTo({
      url: '../sparticularst/sparticularst?id=' + id, 
         })
    }
    else if (id == '-1'){
     
      
    }
  },
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  psw: function (e) {
    this.setData({
      psw: e.detail.value
    })
  },
  logins:function(){
    var that=this
    var phone = this.data.phone
    var psw = this.data.psw
    if(phone==''){
      this.wetoast.toast({
        title: '请输入手机号',
        //  image: '../../image/th.png',
        duration: 2000
      })
    }else if(psw==''){
      this.wetoast.toast({
        title: '请输入密码',
        //  image: '../../image/th.png',
        duration: 2000
      })
    }else{
    wx.request({
      url: getApp().globalData.url + '/api/login/login',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data: {
        phone:phone,
        psw:psw
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 662){
          wx.setStorage({
            key: 'token',
            data: res.data.data
          })
          wx.showToast({
            title: '登录成功',
            duration: 2000,
            success:function(){
              that.setData({
                modalFlag: true,
              })
            }
          })
         
        } else if (res.data.code == 603){
          that.wetoast.toast({
            title: '密码错误',
            // image: '../../image/th.png',
            duration:2000,
          })
        }
        else if (res.data.code == 604) {
          that.wetoast.toast({
            title: '该号未注册',
            // image: '../../image/th.png',
            duration: 2000,
          })
        }
        // that.setData({
        //   mainList: res.data.data.articleMenu,
        //   bannerList: res.data.data.banner,
        // })
      }
    })
  }
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: "爱乐哺育",
      path: '/pages/index/index' ,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})
