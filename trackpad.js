// 打开一个WebSocket:
var ws = new WebSocket("ws://10.13.131.182:3000");

var CODE = "first";
var MODE = 'mouse'
var padDom = document.getElementById("pad");
var barDom = document.getElementById("bar");
var mouseDom = document.getElementById("mouse");
var gestureDom = document.getElementById("gesture");

var padStartX = 0, padStartY = 0;
var barStartX = 0, barStartY = 0;

var hammertime = new Hammer(padDom, {});

// 打开WebSocket连接后立刻发送一条消息:
ws.addEventListener("open", function() {
  ws.send(
    JSON.stringify({
      type: "init-poster",
      data: CODE
    })
  );
});

// 响应收到的消息:
ws.addEventListener("message", function(msg) {
  showTips(JSON.parse(msg).msg)
});


mouseDom.onclick = function () {
  MODE = 'mouse'
  init()
}
gestureDom.onclick = function () {
  MODE = 'gesture'
  init()
}


// 发送事件系列

function sendMouseMove(x, y) {
  ws.send(
    JSON.stringify({
      type: "post",
      code: CODE,
      action: "slide",
      data: {
        x: x,
        y: y
      }
    })
  );
}

function sendScroll(x, y) {
  ws.send(
    JSON.stringify({
      type: "post",
      code: CODE,
      action: "scroll",
      data: {
        x: x,
        y: y
      }
    })
  );
}

function sendClick() {
  ws.send(
    JSON.stringify({
      type: "post",
      code: CODE,
      action: "click",
      data: {}
    })
  );
}

function sendSwipe(side) {
  ws.send(
    JSON.stringify({
      type: "post",
      code: CODE,
      action: "swipe",
      data: side
    })
  );
}


// 触发事件系列
function padTouchStart(e) {
  e.preventDefault()
  padStartX = e.touches[0].pageX;
  padStartY = e.touches[0].pageY;
}

function padTouchMove (e) {
  var X, Y;
  X = e.touches[0].pageX - padStartX;
  Y = e.touches[0].pageY - padStartY;
  padStartX = e.touches[0].pageX;
  padStartY = e.touches[0].pageY;
  sendMouseMove(X, Y);
}

function padClick() {
  sendClick()
}

function swipeLeft(ev) {
  sendSwipe('left');
}

function swipeRight(ev) {
  sendSwipe('right');
}

function swipeUp(ev) {
  sendSwipe('up');
}

function swipeDown(ev) {
  sendSwipe('down');
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




// 滚动条添加事件
barDom.addEventListener("touchstart", function(e) {
  barStartX = e.touches[0].pageX;
  barStartY = e.touches[0].pageY;
});
barDom.addEventListener("touchmove", function(e) {
    var X, Y;
    X = e.touches[0].pageX - barStartX;
    Y = e.touches[0].pageY - barStartY;
    barStartX = e.touches[0].pageX;
    barStartY = e.touches[0].pageY;
    sendScroll(X, Y);
  },
  false
);

function init () {
  if (MODE == 'mouse') {
    hammertime.stop()
    padDom.addEventListener("touchstart", padTouchStart);
    padDom.addEventListener("touchmove", padTouchMove);
    hammertime.on('tap', padClick);
    hammertime.off('swipeleft', swipeLeft);
    hammertime.off('swiperight', swipeRight);
    hammertime.off('swipeup', swipeUp);
    hammertime.off('swipedown', swipeDown);    
  } else {
    padDom.removeEventListener("touchstart", padTouchStart);
    padDom.removeEventListener("touchmove", padTouchMove);
    hammertime.off('tap', padClick);
    hammertime.on('swipeleft', swipeLeft);
    hammertime.on('swiperight', swipeRight);
    hammertime.on('swipeup', swipeUp);
    hammertime.on('swipedown', swipeDown);    
  }
}