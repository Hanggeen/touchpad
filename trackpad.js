// 打开一个WebSocket:
let ws = new WebSocket("ws://10.13.131.182:3000");

let CODE = "first";

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



var padDom = document.getElementById("pad");

var padStartX = 0,
  padStartY = 0;

padDom.addEventListener("touchstart", function(e) {
  padStartX = e.touches[0].pageX;
  padStartY = e.touches[0].pageY;
});
padDom.addEventListener("touchmove", function(e) {
    var X, Y;
    X = e.touches[0].pageX - padStartX;
    Y = e.touches[0].pageY - padStartY;
    padStartX = e.touches[0].pageX;
    padStartY = e.touches[0].pageY;
    mousemove(X, Y);
  },
  false
);
padDom.addEventListener("touchend", function(e) {});





var barDom = document.getElementById("bar");

var barStartX = 0,
  barStartY = 0;

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
    scroll(X, Y);
  },
  false
);
barDom.addEventListener("touchend", function(e) {});








padDom.addEventListener("click", function(e) {
  sendClick();
});





function mousemove(x, y) {
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


function scroll(x, y) {
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

function showTips(text) {
  document.getElementById("tips").innerHTML = text;
  document.getElementById("tips").classList.remove("hide");
  clearTimeout(window.tipsTimeout);
  window.tipsTimeout = setTimeout(function() {
    document.getElementById("tips").classList.add("hide");
  }, 2000);
}
