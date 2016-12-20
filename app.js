//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
  }
})
/**
 * 
 * 从百度API获取城市，根据当前经纬度
 * 
 * http://api.map.baidu.com/geocoder/v2/?ak=pmCgmADsAsD9rEXkqWNcTzjd&location=30.548397,104.04701&output=json&pois=1
 */