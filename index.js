// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

let STORE = {}

wss.on('connection', function (ws) {
  console.log('有新连接');
  let code = '';
  ws.on('message', function (message) {
    let msg;
    try {
      msg = JSON.parse(message)
    } catch (e) {
      ws.send('parse error')
    }
    if (msg.type == 'init-listener') {
      if (STORE[msg.data]) {
        STORE[msg.data].listener = ws;
        code = msg.data;
      } else {
        STORE[msg.data] = {
          listener: ws
        }
      }
      ws.send('注册成功')
    }
    else if (msg.type == 'init-poster') {
      if (STORE[msg.data]) {
        STORE[msg.data].poster = ws;
        code = msg.data;
      } else {
        STORE[msg.data] = {
          poster: ws
        }
      }
      ws.send('注册成功')
    }
    else if (STORE[msg.code]) {

      if (msg.type == 'post') {
        if (STORE[msg.code].listener != undefined) {
          STORE[msg.code].listener.send(message)
        } else {
          ws.send('unregisted1')
        }
      }

      if (msg.type == 'listen') {
        if (STORE[msg.code].post) {
          STORE[msg.code].post.send(message)
        } else {
          ws.send('unregisted2')
        }
      }
    } else {
      ws.send('unregisted3')
    }
  });

  ws.on('close', function () {
    if (code) {
      STORE['code'] = null;
    }
  })

});

console.log('ready')