const Config = require("./config")
const {getIPAdress} = require('../build/tools');
const WsServer = require("./server/wsServer");
const HttpServer = require("./server/httpServer");
const httpServer = new HttpServer(Config);
new WsServer(httpServer.server, Config);

const localIPAdress = getIPAdress();
console.log('\033[42;30m DONE \033[40;32m 请访问 http://' + localIPAdress + ':3000/index.html 体验demo \033[0m');