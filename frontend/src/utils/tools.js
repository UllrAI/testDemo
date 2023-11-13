/*
 * @Date: 2020-04-14 11:17:50
 * @LastEditors: Zth
 * @LastEditTime: 2021-08-24 15:10:52
 * @FilePath: \default\src\utils\tools.js
 */
// 功能
// 深拷贝
import Vue from 'vue'

const clone = (obj) => {
  var o;
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {

    // 如果  他是空的话
    if (obj === null) {
      o = null;
    } else {

      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]));
        }
      }
      // 如果  他是对象object的话
      else {
        o = {};
        for (var j in obj) {
          o[j] = clone(obj[j]);
        }
      }

    }
  } else {
    o = obj;
  }
  return o;
};
Vue.prototype.$clone = clone

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const guid = () => {
  return URL.createObjectURL(new Blob()).substr(-36).toUpperCase()
}
Vue.prototype.$guid = guid
