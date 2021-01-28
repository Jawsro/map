//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['全部','已完成', '建设中', '潜在'],
    index: 0,
    longitude:111.286331,
    latitude:30.69178,
    scale:15,
    markers: [],
    zhedie:false,
    msgBoxIsShow:true,
    daohangLongitude:'',
    daohangLatitude:'',
    daohangAddress:'',
    statusList:[
      {text:"完成区域",icon:'icon-xingxing',color:'#DE6D6B',checked: false},
      {text:"施工区域",icon:'icon-GIS-TL_weixiudian-',color:'#1359E5',checked: false},
      {text:"潜在区域",icon:'icon-wenhao',color:'#E89024',checked: false}
    ],
    phone:'13872675891'
  },
  /**
   * 
   * 生命周期
   */
  callMe(){
    wx.makePhoneCall({
      phoneNumber: this.data.moblie,
    })
  },
  openMsgBox(){
    this.setData({
      zhedie:true
    })
  },
  closeMsgBox(){
    this.setData({
      zhedie:false
    })
  },
  onLoad: function () {
    let that = this;
    that.getUserLocation()
   //that.getLocationMap()
  },
  onReady: function(e) {
    var version = wx.getSystemInfoSync().SDKVersion;
    console.log("版本号: " + version);
  },
  /**
   * 
   * 事件处理函数
   */
  getUserLocation(){
    let that = this
    wx.getSetting({
      success (res) {
        //判断是否有地位权限
        if(!res.authSetting['scope.userLocation']){//没有权限
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意
              //其他操作...
              console.log("用户已经同意位置授权");
            },
            fail(){
              console.log("用户已经拒绝位置授权");
              //如果拒绝，在这里进行再次获取授权的操作
              wx.showModal({
                content: '检测到您没打开此小程序的定位权限，是否去设置打开？',
                confirmText: "确认",
                success: function (res) {
                  console.log(res);
                  //点击“确认”时打开设置页面
                  if (res.confirm) {
                    console.log('用户点击确认')
                    wx.openSetting({
                      success: (res) => {  that.getLocationMap()}
                    })
                  }
                }
              });
            }
          })
        }else{
          //已有权限，调用地图
          that.getLocationMap()
        }
      }
    })
  },
  //调用地图
  getLocationMap(){
    let that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        let marker = that. _createMarker(res);
        that.setData({
          longitude:longitude,
          latitude:latitude,
          markers: that.getHospitalMarkers()
        })
      },
    })
  },
  getHospitalMarkers() {
    let that=this
    //数据从后台获取
    let hospitalData=[{
        "id": 1,
        "name": "楠海花园6-2",
        "longitude": "111.316101",
        "latitude": "30.699499",
        'iconPath': "../../images/qianzai.png",
        "address":"高新区楠海花园小区"
    }, {
        "id": 2,
        "name": "国土资源局小区2幢5单元",
        "longitude": "111.281258",
        "latitude": "30.711201",
        'iconPath':  "../../images/shigong.png",
        "address":"西陵区北门外正街"

    },{
        "id": 3,
        "name": "中心医院7-3",
        "longitude": " 111.284698",
        "latitude": "30.7031",
        "iconPath": "../../images/wancheng.png",
        "address":"伍家岗区宜昌市中心医院"
    },{
      "id": 4,
      "name": "楠海花园3-4",
      "longitude": "111.316101",
      "latitude": "30.699499",
      "iconPath": "../../images/qianzai.png",
      "address":"高新区楠海花园小区"
    },{
      "id":5,
      "name": "夷陵大道116号1单元",
      "longitude": " 111.29955",
      "latitude": "30.68779",
      "iconPath": "../../images/wancheng.png",
      "address":"西陵区夷陵大道116号"
    },{
      "id": 6,
      "name": "葛洲坝中心医院14幢4单元",
      "longitude": "111.286583",
      "latitude": "30.71846",
      "iconPath": "../../images/qianzai.png",
      "address":"西陵区葛洲坝中心医院"
      },{
      "id": 7,
      "name": "世纪花园7（G）-5",
      "longitude": " 111.298981",
      "latitude": "30.689486",
      "iconPath": "../../images/wancheng.png",
      "address":"伍家岗区世纪花园小区"
    },{
      "id": 8,
      "name": "广场路4-3",
      "longitude": "111.29491",
      "latitude": "30.70157",
      "iconPath": "../../images/shigong.png",
      "address":"西陵区广场路4号"
    },{
      "id": 9,
      "name": "胜利三路33号7-1",
      "longitude": "111.30627",
      "latitude": "30.68904",
      "iconPath": "../../images/shigong.png",
      "address":"西陵区胜利三路33号"
    },{
      "id": 10,
      "name": "三峡大学主东13-1",
      "longitude": "111.3174",
      "latitude": "30.72272",
      "iconPath": "../../images/shigong.png",
      "address":"西陵区三峡大学主东小区"
    }
  ]
      let markers = [];
      for (let item of hospitalData) {
        let marker = this._createMarker(item);
        markers.push(marker)
      }
      return markers;
  },
  //选择当前地图施工状态
  bindPickerChange: function (e) {
    //根据所选状态请求后台
    console.log( e.detail)
    this.setData({
      index: e.detail.value
    })
  },
  _createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 20,
      height:20,
      iconPath:point.iconPath,
      address:point.address,
      callout:{
        content: point.name || '',  //文本
        color: '#FF0202',  //文本颜色
        borderRadius: 3,  //边框圆角
        borderWidth: 1,  //边框宽度
        borderColor: '#000',  //边框颜色
        bgColor: '#ffffff',  //背景色
        padding: 5,  //文本边缘留白
        textAlign: 'center' , //文本对齐方式。有效值: left, right, center
        display: 'ALWAYS'
      },
    };
    return marker;
  },
  getDaoHang(){
    let that = this
    console.log(that.daohangLatitude,that.daohangLongitude)
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        wx.openLocation({
          latitude:Number( that.daohangLatitude),
          longitude:Number(that.daohangLongitude),
          scale: 18,
          address:that.daohangAddress,
          success: function (r) {
            console.log(r)
          }
        })
      }
    })  

  },
  //点击标记点时触发，调起导航
  markertap(e) {
    let that = this;
    let id = e.detail.markerId;
    let address = '';
    let goLatitude = null;
    let goLongitude = null;
    that.getHospitalMarkers().forEach(item=>{
      if(item.id==id){
        address = item.address
        goLatitude = item.latitude
        goLongitude = item.longitude
        that.daohangLongitude = item.longitude
        that.daohangLatitude = item.latitude
        that.daohangAddress = item.address
        console.log(item.latitude,item.longitude)
      }
    })
    that.setData({
      msgBoxIsShow:false
    })
  },
  MsgBoxNoShow(){
    this.setData({
      msgBoxIsShow:true
    })
  },
  select(e){
    let index = e.currentTarget.dataset.index
    let bool = this.data.statusList[index].checked
    this.setData({
      ['statusList[' + index + '].checked']: !bool
    })
  }
})
