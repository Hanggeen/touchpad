const Config = require("./config")
const WsServer = require("./server/wsServer");
const HttpServer = require("./server/httpServer");
const httpServer = new HttpServer(Config);
new WsServer(httpServer.server, Config);