// var time = null;//setTimeout的ID，用clearTimeout清除
// Page({
//   data: {
//     box: [{
//       name: '100积分'
//     }, {
//       name: '10元优惠券\n满100可用'
//     }, {
//       name: '60积分'
//     }, {
//       name: '30积分'
//     }, {
//       name: '50积分'
//     }, {
//       name: '30元优惠券\n满120可用'
//     }, {
//       name: '100积分'
//     }, {
//       name: '200积分'
//     }, {
//       name: '10积分'
//     }, {
//       name: '50积分'
//     }, {
//       name: '40积分'
//     }, {
//       name: '50优惠券满500可用'
//     }, {
//       name: '60积分'
//     }, {
//       name: '70积分'
//     }],
//     luckynum: 0,//当前运动到的位置，在界面渲染
//     howManyNum: 10,//抽奖的剩余次数
//     content: {
//       index: 0,    //当前转动到哪个位置，起点位置
//       count: 0,    //总共有多少个位置
//       speed: 50,    //初始转动速度
//       cycle: 3 * 14,    //转动基本次数：即至少需要转动多少次再进入抽奖环节，这里设置的是转动三次后进入抽奖环节
//     },
//     prize: 0,//中奖的位置
//     luckytapif: true//判断现在是否可以点击
//   },
//   // 点击抽奖
//   luckyTap: function () {
//     var i = 0,
//       that = this,
//       howManyNum = this.data.howManyNum,//剩余的抽奖次数
//       luckytapif = this.data.luckytapif,//获取现在处于的状态
//       luckynum = this.data.luckynum,//当前所在的格子
//       prize = Math.floor(Math.random() * 14);//中奖序号,随机生成
//     if (luckytapif && howManyNum > 0) {//当没有处于抽奖状态且剩余的抽奖次数大于零，则可以进行抽奖
//       console.log('prize:' + prize);
//       this.data.content.count = this.data.box.length;//总位置为数组的长度
//       this.setData({
//         howManyNum: howManyNum - 1//更新抽奖次数
//       });
//       this.data.luckytapif = false;//设置为抽奖状态  
//       this.data.prize = prize;//中奖的序号
//       this.roll();//运行抽奖函数
//     } else if (howManyNum == 0 && luckytapif) {
//       wx.showModal({
//         title: '',
//         content: '您的抽奖次数已经没有了',
//         showCancel: false
//       })
//     }
//   },
//   //抽奖
//   roll: function () {
//     var content = this.data.content,
//       prize = this.data.prize,//中奖序号
//       that = this;
//     if (content.cycle - (content.count - prize) > 0) {//最后一轮的时间进行抽奖
//       content.index++;
//       content.cycle--;
//       this.setData({
//         luckynum: content.index % 14  //当前应该反映在界面上的位置
//       });
//       setTimeout(this.roll, content.speed);//继续运行抽奖函数
//     } else {
//       if (content.index < (content.count * 3 + prize)) {//判断是否停止
//         content.index++;
//         content.speed += (550 / 14);//最后一轮的速度，匀加速，最后停下时的速度为550+50
//         this.data.content = content;
//         this.setData({
//           luckynum: content.index % 14
//         });
//         console.log(content.index, content.speed);//打印当前的步数和当前的速度
//         setTimeout(this.roll, content.speed);
//       } else {
//         //完成抽奖，初始化数据
//         console.log('完成');
//         content.index = 0;
//         content.cycle = 3 * 14;
//         content.speed = 50;
//         this.data.luckytapif = true;
//         clearTimeout(time);
//         wx.showModal({
//           title: '',
//           content: '恭喜你抽到了' + that.data.box[prize].name,
//           showCancel: false
//         })
//       }
//     }
//   },
//   // 转换为base64
//   ddd:function(){
//     var root=this
//     wx.chooseImage({
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         var tempFilePaths = res.tempFilePaths
//         wx.request({
//           url: tempFilePaths[0],
//           method: 'GET',
//           responseType: 'arraybuffer',
//           success: function (res) {
//             var base64 = wx.arrayBufferToBase64(res.data);
//             console.log('data:image/jpg;base64,' + base64)
//             root.setData({
//               url: 'data:image/jpg;base64,' + base64
//             })
//           }
//         });
//       }
//     })
//   },
//   // 点击加_压缩
//   takePhoto: function () {
//     var that = this;
//     let imgViewList = that.data.imgViewList; //这个是用来承载页面循环展示图片的
//     //拍照、从相册选择上传
//     wx.chooseImage({
//       count: 4,  //这个是上传的最大数量，默认为9
//       sizeType: ['compressed'],  //这个可以理解为上传的图片质量类型（官方给的），虽然没什么卵用，要不然还要我们自己写压缩做什么
//       sourceType: ['album', 'camera'],  //这个是图片来源，相册或者相机
//       success: function (res) {
//         var tempFilePaths = res.tempFilePaths  //这个是选择后返回的图片列表
//         that.getCanvasImg(0, 0, tempFilePaths);  //进行压缩
//       }
//     });
//   },
//   //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
//   getCanvasImg: function (index, failNum, tempFilePaths) {
//     var that = this;
//     if (index < tempFilePaths.length) {
//       const ctx = wx.createCanvasContext('attendCanvasId');
//       ctx.drawImage(tempFilePaths[index], 0, 0, 300, 150);
//       ctx.draw(true, function () {
//         index = index + 1;//上传成功的数量，上传成功则加1
//         wx.canvasToTempFilePath({
//           canvasId: 'attendCanvasId',
//           success: function success(res) {
//             that.uploadCanvasImg(res.tempFilePath);
//             that.getCanvasImg(index, failNum, tempFilePaths);
//           }, fail: function (e) {
//             failNum += 1;//失败数量，可以用来提示用户
//             that.getCanvasImg(inedx, failNum, tempFilePaths);
//           }
//         });
//       });
//     }
//   },
//   //上传图片
//   uploadCanvasImg: function (canvasImg) {
//     var that = this;
//     let imgViewList = that.data.imgViewList;
//     var tempImg = canvasImg;
//     wx.uploadFile({
//       url: app.d.fileServer,//文件服务器的地址
//       filePath: tempImg,
//       formData: {
//         paramPath: "gift"
//       },
//       name: 'file',
//       success: function (res) {
//         var json2map = JSON.parse(res.data);
//         imgViewList.push(app.d.imageUrlFix + json2map[0].fileUrl);
//         that.setData({
//           imgViewList: imgViewList,
//         })
//       }
//     })
//   },
//   onLoad: function (options) {

//   },
//   onReady: function () {

//   },
//   onShow: function () {

//   },
//   onHide: function () {

//   },
//   onUnload: function () {

//   }
// })



// // var content = null;
// // var touchs = [];
// // var canvasw = 0;
// // var canvash = 0;

// // //获取系统信息
// // wx.getSystemInfo({
// //   success: function (res) {
// //     canvasw = res.windowWidth;
// //     canvash = canvasw * 9 / 16;
// //   },
// // }),

// //   Page({

//     /**
//      * 页面的初始数据
//      */
//     // data: {
//     //   signImage: '',
//     //   imgUrls: ['https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/5e1fe6b59fe69b9c626162799232','https://imgsa.baidu.com/forum/pic/item/faf2b2119313b07ef7cf4ca00cd7912397dd8c23.jpg?v=tbs'],
//     //     indicatorDots: true,
//     //     autoplay: true,
//     //     interval: 2000,
//   //       duration: 1000, 
//   //     // bannerList: [
//   //     //   { coverImg: '../../image/微信图片_20180605162058.jpg' },   
//   //     //   { coverImg:'../../image/微信图片_20180605162134.jpg'},
//   //     //   { coverImg: '../../image/微信图片_20180605162537.jpg' },
//   //     //   { coverImg: '../../image/微信图片_20180605162420.jpg' },
//   //     //   { coverImg: '../../image/微信图片_20180605162424.jpg'},
      
//   //     //     ]
//   //   },

//   //   // 画布的触摸移动开始手势响应
//   //   start: function (event) {
//   //     // console.log("触摸开始" + event.changedTouches[0].x)
//   //     // console.log("触摸开始" + event.changedTouches[0].y)
//   //     //获取触摸开始的 x,y
//   //     let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
//   //     touchs.push(point)
//   //   },

//   //   // 画布的触摸移动手势响应
//   //   move: function (e) {

//   //     let point = { x: e.touches[0].x, y: e.touches[0].y }
//   //     touchs.push(point)

//   //     if (touchs.length >= 2) {
//   //       this.draw(touchs)
//   //     }
//   //   },

//   //   // 画布的触摸移动结束手势响应
//   //   end: function (e) {
//   //     console.log("触摸结束" + e)
//   //     //清空轨迹数组
//   //     for (let i = 0; i < touchs.length; i++) {
//   //       touchs.pop()
//   //     }

//   //   },

//   //   // 画布的触摸取消响应
//   //   cancel: function (e) {
//   //     console.log("触摸取消" + e)
//   //   },

//   //   // 画布的长按手势响应
//   //   tap: function (e) {
//   //     console.log("长按手势" + e)
//   //   },

//   //   error: function (e) {
//   //     console.log("画布触摸错误" + e)
//   //   },
//   //   /**
//   //  * 生命周期函数--监听页面加载
//   //  */
//   //   onLoad: function (options) {
//   //     //获得Canvas的上下文
//   //     content = wx.createCanvasContext('firstCanvas')
//   //     //设置线的颜色
//   //     content.setStrokeStyle("#00ff00")
//   //     //设置线的宽度
//   //     content.setLineWidth(5)
//   //     //设置线两端端点样式更加圆润
//   //     content.setLineCap('round')
//   //     //设置两条线连接处更加圆润
//   //     content.setLineJoin('round')
//   //   },

//   //   /**
//   //    * 生命周期函数--监听页面初次渲染完成
//   //    */
//   //   onReady: function () {

//   //   },

//   //   //绘制
//   //   draw: function (touchs) {
//   //     let point1 = touchs[0]
//   //     let point2 = touchs[1]
//   //     touchs.shift()
//   //     content.moveTo(point1.x, point1.y)
//   //     content.lineTo(point2.x, point2.y)
//   //     content.stroke()
//   //     content.draw(true)
//   //   },
//   //   //清除操作
//   //   clearClick: function () {
//   //     //清除画布
//   //     content.clearRect(0, 0, canvasw, canvash)
//   //     content.draw(true)
//   //   },
//   //   //保存图片
//   //   saveClick: function () {
//   //     var that = this
//   //     wx.canvasToTempFilePath({
//   //       canvasId: 'firstCanvas',

//   //       success: function (res) {
//   //         //打印图片路径
//   //         console.log(res.tempFilePath)
//   //         //设置保存的图片
//   //         that.setData({
//   //           signImage: res.tempFilePath
//   //         })
//   //       }
//   //     })

//   //   }

//   // })

// 日历
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    sysW: null,
    lastDay: null,
    firstDay: null,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    year: null
  },

  //获取日历相关参数
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();

    //最后一天是几号
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();

    //第一天星期几
    let firstDay = new Date(year, month, 1);
    this.data.firstDay = firstDay.getDay();
  },

  onLoad: function (options) {
    this.dataTime();

    //根据得到今月的最后一天日期遍历 得到所有日期
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.arr.push(i);
    }
    var res = wx.getSystemInfoSync();
    this.setData({
      sysW: res.windowHeight / 12,//更具屏幕宽度变化自动设置宽度
      marLet: this.data.firstDay,
      arr: this.data.arr,
      year: this.data.year,
      getDate: this.data.getDate,
      month: this.data.month
    });
  }
})


