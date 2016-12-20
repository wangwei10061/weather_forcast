//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    city: null,
    country: null,
    currentTemp: null,
    forecast: [],
    pinyin: null,
    isFirst: true
  },

  onLoad: function () {
    this.getWeather();
    this.setData({isFirst: false});
  },

  getWeather: function () {
    // console.log("执行了");
    if (!this.data.isFirst) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      })
    }
    var me = this;

    // 获取位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {

        // 调用api接口获取城市
        var urla = 'https://api.map.baidu.com/geocoder/v2/?ak=NaQYFuKXDcM8Cj5kPrGhGmBCUKc3EcnS&location=' + res.latitude +
          ',' + res.longitude + '&output=json&pois=1';
        wx.request({
          url: urla,
          success: function (res) {
            me.setData({ "city": res.data.result.addressComponent.city });
            me.setData({ "country": res.data.result.addressComponent.country });

            // 调用api获取天气
            var urlb = "http://wthrcdn.etouch.cn/weather_mini?city=" + res.data.result.addressComponent.city.substring(0, 2) + "";

            wx.request({
              url: urlb,
              success: function (res) {

                // 处理参数
                var forecast = [];
                for (var i = 0; i < 5; i++) {
                  forecast[i] = {
                    date: res.data.data.forecast[i].date,
                    type: res.data.data.forecast[i].type,
                    low: res.data.data.forecast[i].low.substring(2),
                    high: res.data.data.forecast[i].high.substring(2)
                  }

                }

                var pinyin = null;
                switch (forecast[0].type) {
                  case '晴':
                    pinyin = 'qing';
                    break;
                  case '阴':
                    pinyin = 'yin';
                    break;
                  case '多云':
                    pinyin = 'duoyun';
                    break;
                  case '小雨':
                    pinyin = 'xiaoyu';
                    break;
                  case '中雨':
                    pinyin = 'zhongyu';
                    break;
                  case '大雨':
                    pinyin = 'dayu';
                    break;
                  case '暴雨':
                    pinyin = 'baoyu';
                    break;
                  case '阵雨':
                    pinyin = 'zhenyu';
                    break;
                  case '雷阵雨':
                    pinyin = 'leizhenyu';
                    break;
                  case '雨夹雪':
                    pinyin = 'yujiaxue';
                    break;
                  case '冰雹':
                    pinyin = 'binbao';
                    break;
                  case '雾':
                    pinyin = 'wu';
                    break;
                  case '霾':
                    pinyin = 'mai';
                    break;
                  case '小雪':
                    pinyin = 'xiaoxue';
                    break;
                  case '大学':
                    pinyin = 'daxue';
                    break;
                  case '暴雪':
                    pinyin = 'baoxue';
                    break;
                  default: pinyin = 'qing';
                }
                // 回传
                me.setData({ currentTemp: res.data.data.wendu });
                me.setData({ forecast: forecast });
                me.setData({ pinyin: pinyin });
              }
            })

          }
        })
      }
    })
  }
})
