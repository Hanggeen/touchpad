const fs = require('fs')
const Config = require("./config")
const httpServer = Config.ssl ? require('https') : require('http')
const WsServer = require("./wsserver");

// http server
let server = null
if (Config.ssl) {
  server = httpServer.createServer({
    key: fs.readFileSync( Config.ssl_key ),
    cert: fs.readFileSync( Config.ssl_cert )
  }, function( req, res ) {
    res.writeHead(200);
    res.end("This is used for websocket!\n");
  }).listen( Config.port );
} else {
  server = httpServer.createServer().listen( Config.port );
}

new WsServer(server, Config);