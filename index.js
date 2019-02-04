// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss1 = new WebSocketServer({
    port: 3000
});
// 实例化:
const wss2 = new WebSocketServer({
    port: 3001
});

let window = {}

wss1.on('connection', function (ws) {
  console.log(`trackpad connection()`);
  ws.on('message', function (message) {
      console.log(`trackpad 收到: ${message}`);
      if (window.screen) {
          window.screen.send(message)
      }
    //   ws.send(`ECHO: ${message}`, (err) => {
    //       if (err) {
    //           console.log(`[SERVER] error: ${err}`);
    //       }
    //   });
  })
});

wss2.on('connection', function (ws) {
    console.log(`[screen] connection()`);
    ws.on('message', function (message) {
        console.log(`[screen] Received: ${message}`);
        // ws.send(`ECHO: ${message}`, (err) => {
        //     if (err) {
        //         console.log(`[screen] error: ${err}`);
        //     }
        // });
        window.screen = ws;
    })
  });
  