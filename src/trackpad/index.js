// 初始化工具
var $ = function (param) {
  if (param[0] == '#') {
    return document.getElementById(param.slice(1))
  }
  return document.querySelector(param)
}

$.getQueryString = function(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
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
var eventHandler = {
  barTouchStart: function (e) {
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
  },
  barTouchMove: function(e) {
    $.showTips('滑动滚轮');
    var X, Y;
    X = e.touches[0].pageX - barStartX;
    Y = e.touches[0].pageY - barStartY;
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
    ws.sendMessage('scroll', {x: X, y: Y});
  },
  padTouchStart: function (e) {
    e.preventDefault()
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
  },
  padTouchMove: function (e) {
    $.showTips('滑动光标');
    var X, Y;
    X = e.touches[0].pageX - padStartX;
    Y = e.touches[0].pageY - padStartY;
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
    ws.sendMessage('slide', {x:X, y:Y})
  },
  padClick: function() {
    ws.sendMessage('click')
  },
  swipeLeft: function(ev) {
    ws.sendMessage('swipe', 'left');
    $.showTips('向左滑动');
  },
  swipeRight: function (ev) {
    ws.sendMessage('swipe', 'right');
    $.showTips('向右滑动');
  },
  swipeUp: function(ev) {
    ws.sendMessage('swipe', 'up');
    $.showTips('向上滑动');
  },
  swipeDown: function(ev) {
    ws.sendMessage('swipe', 'down');
    $.showTips('向下滑动');
  }
}




var CODE = $.getQueryString('co') || 'public';
var MODE = 'mouse'

var padDom = $("#pad");
var barDom = $("#bar");
var mouseDom = $("#mouse");
var gestureDom = $("#gesture");
var gesturePadDom = $("#gesturearea")
var mousePadDom = $("#mousearea")

var padStartX = 0, padStartY = 0;
var barStartX = 0, barStartY = 0;

var padDomHammer = new Hammer(padDom, {});
var gestureDomHammer = new Hammer(gesturePadDom, {});



(function () {

  // 打开一个WebSocket:
  window.ws = new WebSocket("ws://" + $.getQueryString('ws'));
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
  }
   else if (MODE == 'gesture') {
    gesturePadDom.style.display = 'flex';
  }
  padDomHammer.on('tap', eventHandler.padClick);
  gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  gestureDomHammer.on('tap', eventHandler.padClick);
  gestureDomHammer.on('swipeleft', eventHandler.swipeLeft);
  gestureDomHammer.on('swiperight', eventHandler.swipeRight);
  gestureDomHammer.on('swipeup', eventHandler.swipeUp);
  gestureDomHammer.on('swipedown', eventHandler.swipeDown);  
  barDom.addEventListener("touchstart", eventHandler.barTouchStart);
  barDom.addEventListener("touchmove", eventHandler.barTouchMove);
  padDom.addEventListener("touchstart", eventHandler.padTouchStart);
  padDom.addEventListener("touchmove", eventHandler.padTouchMove);

  mouseDom.addEventListener("click", function () {
    MODE = 'mouse'
    gestureDom.classList.remove('active')
    mouseDom.classList.add('active')
    mousePadDom.style.display = 'flex';
    gesturePadDom.style.display = 'none';
    ws.sendMessage('change', 'mouse');
  })
  gestureDom.addEventListener("click", function () {
    MODE = 'gesture'
    gestureDom.classList.add('active')
    mouseDom.classList.remove('active')
    mousePadDom.style.display = 'none';
    gesturePadDom.style.display = 'flex';
    ws.sendMessage('change', 'gesture');
  })
})()
