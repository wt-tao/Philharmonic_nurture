// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    tempFilePaths:'',
    content:'',
    star: '',
    star1: '',
    star2: '',
    starMap: [
      '0',
      '1',
      '2',
      '3',
      '4',
    ],
  },
  myStarChoose1(e) {
    console.log(e)
    let star1 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star1: star1,
    });
  },
  myStarChoose2(e) {
    console.log(e)
    let star2 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star2: star2,
    });
  },
  myStarChoose(e) {
    console.log(e)
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  wb:function(e){
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  sc:function(e){
    var that=this
    // var pics = this.data.pics
    wx.chooseImage({
      count: 9 , // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths[0])
        console.log(res.tempFilePaths)
        
        // var imgsrc = res.tempFilePaths;
        // 　　pics = pics.concat(imgsrc);
 
        //  var tempFilePaths =[]
        // for (var i = 0; i < res.tempFilePaths.length;i++){
        //   tempFilePaths.push(res.tempFilePaths[i]) 
        // }
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        if (tempFilePaths!=''){
          that.setData({
            show:true,
            tempFilePaths: tempFilePaths,
          })
        }
      }
    })
  },
  pj:function(){
    var that=this
    var lastAppointmentId = this.data.lastAppointmentId
    var type=this.data.type
    var content = this.data.content
    var star_attitude = this.data.star1  //服务
    var star_technique = this.data.star2  //手法
    var star_effect = this.data.star // 效果
    var tempFilePaths = this.data.tempFilePaths
    if (content==''){
      wx.showToast({
        title: '未填内容',
      })
    }
    if (star_attitude == '') {
      wx.showToast({
        title: '未选服务',
      })
    }
    if (star_attitude == '') {
      wx.showToast({
        title: '未选手法',
      })
    }
    if (star_effect == '') {
      wx.showToast({
        title: '未选效果',
      })
    }
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token=res.data
        // console.log(res)
        // console.log(res.data)
        wx.uploadFile({
          filePath: tempFilePaths,
          name: 'img',
          url: getApp().globalData.url + '/api/services/appraise',
          formData: {
            token: token,
            serviceOrderId: lastAppointmentId,
            // type: type,
            content: content,
            starAttitude: star_attitude,
            starTechnique: star_technique,
            starEffect: star_effect,
            img:tempFilePaths,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
          },
          method: 'POST',
          success: function (ss) {
            console.log(ss) 
            if (ss.data == '{"code":203,"message":"修改成功","data":null}'){
              wx.showToast({
                title: '评价成功',
                success:function(){
                  wx.redirectTo({
                    url: '../serve/serve',
                  })
                }
              })
            }
            // var tokens=ss.data.data
            // console.log(tokens)
            // wx.uploadFile({
            
            //   url: getApp().globalData.url + '/api/services/appraise_imgs',
            //   filePath: tempFilePaths,
            //   name: 'imgs_',
            //   formData: {
            //     token: token,
            //     appraise_token:tokens,
            //     imgs_: tempFilePaths
            //   },
            //   success:function(r){
            //     console.log(r)
            //     if(r.statusCode=='200'){
            //       wx.showToast({
            //         title: '评价成功',
            //         duration:2000,
            //         success:function(){
            //           wx.reLaunch({
            //             url: '../my/my',
            //           })
            //         }
            //       })
            //     }
            //   }
            // })
            // that.setData({
            //   tmrssLists: res.data.data.list
            // })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options)
    let lastAppointmentId = options.lastAppointmentId
    let img = options.img
  this.setData({
    lastAppointmentId: lastAppointmentId,
    img: img,
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