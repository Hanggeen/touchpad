const WebSocket = require('ws')
const Listener = require('./Listener');
const Poster = require('./Poster');

class Server {
  constructor(server, config) {
    const WebSocketServer = WebSocket.Server
    this.wss = new WebSocketServer({ server })
    this.wss.on('connection', function(ws, request, client){
      if (request.url == '/listener') {
        new Listener(ws);
      }
      if (request.url == '/poster') {
        new Poster(ws);
      }
    });
    console.log('websocket已准备');
  }
}

module.exports = Server