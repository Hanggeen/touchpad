function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function sendMessage (action, data = null) {
  ws.send(JSON.stringify({
    type: "post",
    code: CODE,
    action: action,
    data: data
  }))
}

var eventHandler = {
  barTouchStart: function (e) {
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
  },
  barTouchMove: function(e) {
    showTips('滑动滚轮');
    var X, Y;
    X = e.touches[0].pageX - barStartX;
    Y = e.touches[0].pageY - barStartY;
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
    sendMessage('scroll', {x: X, y: Y});
  },
  padTouchStart: function (e) {
    e.preventDefault()
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
  },
  padTouchMove: function (e) {
    showTips('滑动光标');
    var X, Y;
    X = e.touches[0].pageX - padStartX;
    Y = e.touches[0].pageY - padStartY;
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
    sendMessage('slide', {x:X, y:Y})
  },
  padClick: function() {
    sendMessage('click')
  },
  swipeLeft: function(ev) {
    sendMessage('swipe', 'left');
    showTips('向左滑动');
  },
  swipeRight: function (ev) {
    sendMessage('swipe', 'right');
    showTips('向右滑动');
  },
  swipeUp: function(ev) {
    sendMessage('swipe', 'up');
    showTips('向上滑动');
  },
  swipeDown: function(ev) {
    sendMessage('swipe', 'down');
    showTips('向下滑动');
  }
}



// 公用
function showTips(text) {
  document.getElementById("tips").innerHTML = text;
  document.getElementById("tips").classList.remove("hide");
  clearTimeout(window.tipsTimeout);
  window.tipsTimeout = setTimeout(function() {
    document.getElementById("tips").classList.add("hide");
  }, 2000);
}




// 打开一个WebSocket:
var ws = new WebSocket("ws://" + getQueryString('ws'));

var CODE = "first";
var MODE = 'mouse'

var padDom = document.getElementById("pad");
var barDom = document.getElementById("bar");
var mouseDom = document.getElementById("mouse");
var gestureDom = document.getElementById("gesture");
var gesturePadDom = document.getElementById("gesturearea")
var mousePadDom = document.getElementById("mousearea")

var padStartX = 0, padStartY = 0;
var barStartX = 0, barStartY = 0;

var padDomHammer = new Hammer(padDom, {});
var gestureDomHammer = new Hammer(gesturePadDom, {});
gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// 打开WebSocket连接后立刻发送一条消息:
ws.addEventListener("open", function() {
  sendMessage('init-poster', CODE)
});

// 响应收到的消息:
ws.addEventListener("message", function(msg) {
  showTips(JSON.parse(msg.data).msg)
});


mouseDom.onclick = function () {
  MODE = 'mouse'
  gestureDom.classList.remove('active')
  mouseDom.classList.add('active')
  mousePadDom.style.display = 'flex';
  gesturePadDom.style.display = 'none';
}
gestureDom.onclick = function () {
  MODE = 'gesture'
  gestureDom.classList.add('active')
  mouseDom.classList.remove('active')
  mousePadDom.style.display = 'none';
  gesturePadDom.style.display = 'flex';
}

function init () {
  if (MODE == 'mouse') {
    mousePadDom.style.display = 'flex';
  }
   else if (MODE == 'gesture') {
    gesturePadDom.style.display = 'flex';
  }
  gestureDomHammer.on('tap', eventHandler.padClick);
  padDomHammer.on('tap', eventHandler.padClick);
  gestureDomHammer.on('swipeleft', eventHandler.swipeLeft);
  gestureDomHammer.on('swiperight', eventHandler.swipeRight);
  gestureDomHammer.on('swipeup', eventHandler.swipeUp);
  gestureDomHammer.on('swipedown', eventHandler.swipeDown);  
  barDom.addEventListener("touchstart", eventHandler.barTouchStart);
  barDom.addEventListener("touchmove", eventHandler.barTouchMove);
  padDom.addEventListener("touchstart", eventHandler.padTouchStart);
  padDom.addEventListener("touchmove", eventHandler.padTouchMove);
}

function changePanel (type) {
  mouseDom.classList.remove('active')
  gestureDom.classList.remove('active')
  mousePadDom.style.display = 'none';
  gesturePadDom.style.display = 'none';
  if (type == 'mouse') {
    MODE = 'mouse'
    mouseDom.classList.add('active')
    gestureDom.style.display = 'flex';
  }
  else if (type == 'gesture') {
    MODE = 'gesture'
    gestureDom.classList.add('active')
    gesturePadDom.style.display = 'flex';
  }
}

init();
