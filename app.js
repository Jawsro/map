//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success (res) {
    //     console.log(res)
    //     //判断是否有地位权限
    //     // if(!res.authSetting['scope.userLocation']){
    //     //   //没有权限
    //     //   wx.showModal({
    //     //     title: '提示',
    //     //     content: '请求获取位置权限',
    //     //     success (res) {
    //     //       if(res.confirm == false){
    //     //         return false
    //     //       }
    //     //       wx.openSetting({
    //     //         success (res) {
    //     //           //如果再次拒绝则返回页面并提示
    //     //           if (!res.authSetting['scope.userLocation']) {
    //     //             wx.showToast({
    //     //             title: '此功能需获取位置信息，请重新设置',
    //     //             duration: 3000,
    //     //             icon: 'none'
    //     //             })
    //     //           }else{
    //     //             //允许授权后，调用地图
    //     //             this.globalData.userLocation = res.userLocation
    //     //           }
    //     //         },
    //     //       })
    //     //     }
    //     //   })
    //     // }else{
    //     //   //已有权限，调用地图
    //     //   this.globalData.userLocation = res.userLocation
    //     // }
        
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    userLocation:null,//地图定位信息
  }
})