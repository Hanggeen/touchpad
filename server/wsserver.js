const WebSocket = require('ws')
const Connect = require('./connect');

class Server {
  constructor(server, config) {
    this._STORE = {}
    this.connectNum = 0
    const WebSocketServer = WebSocket.Server
    this.wss = new WebSocketServer({ server })
    this.wss.on('connection', function(ws){
      console.log('有新连接');
      this.connectNum++;
      console.log(Connect === Connect.prototype.constructor);
      console.log(typeof Connect);
      new Connect(ws);
    });
    console.log('websocket已准备');
  }
}

module.exports = Server