// pages/leave/leave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    show: false,
    info: "",
    noteMaxLen:123456789,
    //noteNowLen:0当前字数
  },
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value;
    // len = parseInt(value.length);当前字数
    // if (len > that.data.noteMaxLen) return;
    that.setData({
      info: value,
      // noteNowLen: len
    })
  },
  sc: function (e) {
    var that = this
    // var pics = this.data.pics
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths[0])
        // console.log(res.tempFilePaths)

        // var imgsrc = res.tempFilePaths;
        // 　　pics = pics.concat(imgsrc);
        

        //  var tempFilePaths =[]
        // for (var i = 0; i < res.tempFilePaths.length;i++){
        //   tempFilePaths.push(res.tempFilePaths[i]) 
        // }
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        if (tempFilePaths != '') {
          that.setData({
            show: true,
            tempFilePaths: tempFilePaths,
          })
        }
      }
    })
  },
  // 提交数据
  bindSubmit: function (){
    var that=this
    var message = this.data.info
    var tempFilePaths = this.data.tempFilePaths
      wx.getStorage({
        key: 'token',
        success: function(r) {
          wx.uploadFile({
            url: getApp().globalData.url + '/api/user/leaveMessage',
            filePath: tempFilePaths,
            name: 'img',
            formData: {
              token: r.data,
              message: message,
              img: tempFilePaths,
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.code == 612) {
                wx.showModal({
                  title: '提示',
                  content: '用户未登录,请登录',
                  success: function (res) {
                    console.log(res)
                    if (res.confirm) {
                      wx.removeStorage({
                        key: 'token',
                        success: function () {
                          var lg = 1
                          wx.reLaunch({
                            url: '../index/index?lg=' + lg,
                          })
                        }
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
              else  {
                wx.showToast({
                  title: '提交成功',
                  duration: 3000,
                  success: function () {
                    that.setData({
                      info: '',
                      tempFilePaths:'',
                      // noteNowLen: 0
                    })
                  }
                })
              }

            }
          })
        },
      })
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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