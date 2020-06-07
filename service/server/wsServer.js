const WebSocket = require('ws')
const Listener = require('../modules/listener');
const Poster = require('../modules/poster');

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
  }
}

module.exports = Server