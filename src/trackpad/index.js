import Hammer from '../libs/hammer.min.js'
// 初始化工具
const $ = function (param) {
  if (param[0] == '#') {
    return document.getElementById(param.slice(1))
  }
  return document.querySelector(param)
}

$.getQueryString = function(name) { 
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  let r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 

$.showTips = function(text) {
  $("#tips").innerHTML = text;
  $("#tips").classList.remove("hide");
  clearTimeout(window.tipsTimeout);
  window.tipsTimeout = setTimeout(function() {
    $("#tips").classList.add("hide");
  }, 2000);
}



// 事件处理
const eventHandler = {
  // 开始触摸时，记住标记位置
  barTouchStart: function (e) {
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
  },
  // 滚动滚轮时，设置标记位置、计算差值、发送事件
  barTouchMove: function(e) {
    $.showTips('滑动滚轮');
    let X, Y;
    X = e.touches[0].pageX - barStartX;
    Y = e.touches[0].pageY - barStartY;
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
    ws.sendMessage('scroll', {x: X, y: Y});
  },
  // 开始触摸时，记住标记位置
  padTouchStart: function (e) {
    e.preventDefault()
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
  },
  // 滑动时，设置标记位置、计算差值、发送事件
  padTouchMove: function (e) {
    $.showTips('滑动光标');
    let X, Y;
    X = e.touches[0].pageX - padStartX;
    Y = e.touches[0].pageY - padStartY;
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
    ws.sendMessage('slide', {x:X, y:Y})
  },
  // 发送点击事件
  padClick: function() {
    ws.sendMessage('click')
  },
  // 发送点击事件，这个是从属于swipe类型，因此不直接触发click
  swipeClick: function() {
    ws.sendMessage('swipe', 'click');
    $.showTips('点击');
  },
  // 左滑动
  swipeLeft: function(ev) {
    ws.sendMessage('swipe', 'left');
    $.showTips('向左滑动');
  },
  // 右滑动
  swipeRight: function (ev) {
    ws.sendMessage('swipe', 'right');
    $.showTips('向右滑动');
  },
  // 上滑动
  swipeUp: function(ev) {
    ws.sendMessage('swipe', 'up');
    $.showTips('向上滑动');
  },
  // 下滑动
  swipeDown: function(ev) {
    ws.sendMessage('swipe', 'down');
    $.showTips('向下滑动');
  }
}




let CODE = $.getQueryString('co') || 'public';
let MODE = 'mouse'

const padDom = $("#pad");
const barDom = $("#bar");
const mouseDom = $("#mouse");
const gestureDom = $("#gesture");
const gesturePadDom = $("#gesturearea")
const mousePadDom = $("#mousearea")

let padStartX = 0, padStartY = 0;
let barStartX = 0, barStartY = 0;

const padDomHammer = new Hammer(padDom, {});
const gestureDomHammer = new Hammer(gesturePadDom, {});



(function () {

  let wsurl;
  if (document.location.protocol === 'https:') {
    wsurl = `wss://${$.getQueryString('ws')}`
  } else {
    wsurl = `ws://${$.getQueryString('ws')}`
  }
  // 打开一个WebSocket:
  window.ws = new WebSocket(wsurl);
  // 打开WebSocket连接后立刻发送一条消息:
  ws.addEventListener("open", function() {
    ws.send(JSON.stringify({
      type: "center",
      code: CODE,
      action: "init-poster",
      data: CODE
    }))
  });

  // 响应收到的消息:
  ws.addEventListener("message", function(msg) {
    $.showTips(JSON.parse(msg.data).data)
  });

  ws.sendMessage = function (action, data = null) {
    this.send(JSON.stringify({
      type: "post",
      code: CODE,
      action: action,
      data: data
    }))
  }

  if (MODE == 'mouse') {
    mousePadDom.style.display = 'flex';
  } else if (MODE == 'gesture') {
    gesturePadDom.style.display = 'flex';
  }

  // 绑定事件
  padDomHammer.on('tap', eventHandler.padClick);
  gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  gestureDomHammer.on('tap', eventHandler.swipeClick);
  gestureDomHammer.on('swipeleft', eventHandler.swipeLeft);
  gestureDomHammer.on('swiperight', eventHandler.swipeRight);
  gestureDomHammer.on('swipeup', eventHandler.swipeUp);
  gestureDomHammer.on('swipedown', eventHandler.swipeDown);  
  barDom.addEventListener("touchstart", eventHandler.barTouchStart);
  barDom.addEventListener("touchmove", eventHandler.barTouchMove);
  padDom.addEventListener("touchstart", eventHandler.padTouchStart);
  padDom.addEventListener("touchmove", eventHandler.padTouchMove);

  // 选择触摸板类型
  mouseDom.addEventListener("click", function () {
    MODE = 'mouse'
    gestureDom.classList.remove('active')
    mouseDom.classList.add('active')
    mousePadDom.style.display = 'flex';
    gesturePadDom.style.display = 'none';
    ws.sendMessage('change', 'mouse');
  })
  // 选择手势类型
  gestureDom.addEventListener("click", function () {
    MODE = 'gesture'
    gestureDom.classList.add('active')
    mouseDom.classList.remove('active')
    mousePadDom.style.display = 'none';
    gesturePadDom.style.display = 'flex';
    ws.sendMessage('change', 'gesture');
  })
})()
