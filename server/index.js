// 导入WebSocket模块:
const WebSocket = require("ws");

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
  port: 3000
});

let STORE = {};

wss.on("connection", function(ws) {
  console.log("有新连接");
  let code = "";
  ws.on("message", function(message) {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch (e) {
      ws.send("发送格式错误");
      console.log("发送格式错误");
    }
    if (msg.type == "init-listener") {
      if (STORE[msg.data]) {
        STORE[msg.data].listener = ws;
        code = msg.data;
      } else {
        STORE[msg.data] = {
          listener: ws
        };
      }
      ws.send(JSON.stringify({
        status: "ok",
        msg: 'Register success'
      }));
    } else if (msg.type == "init-poster") {
      if (STORE[msg.data]) {
        STORE[msg.data].poster = ws;
        code = msg.data;
      } else {
        STORE[msg.data] = {
          poster: ws
        };
      }
      ws.send(JSON.stringify({
        status: "ok",
        msg: 'Register success'
      }));
    } else if (STORE[msg.code]) {
      if (msg.type == "post") {
        if (STORE[msg.code].listener != undefined) {
          STORE[msg.code].listener.send(message);
        } else {
          ws.send(JSON.stringify({
            status: "fail",
            msg: '此码未连接'
          }));
        }
      }

      if (msg.type == "listen") {
        if (STORE[msg.code].post) {
          STORE[msg.code].post.send(message);
        } else {
          ws.send(JSON.stringify({
            status: "fail",
            msg: '此码未连接'
          }));
        }
      }
    } else {
      ws.send(JSON.stringify({
        status: "fail",
        msg: '此码未连接'
      }));
    }
  });

  ws.on("close", function() {
    console.log('有关闭')
    if (code) {
      STORE["code"] = null;
    }
  });
});

console.log("ready");
