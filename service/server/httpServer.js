const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');

class HttpServer {
  constructor(config) {
    this.config = config;
    let sslConf = {};
    let server = http;
    if (this.config.ssl && this.config.ssl_key && this.config.ssl_cert) {
      sslConf = {
        key: fs.readFileSync(this.config.ssl_key),
        cert: fs.readFileSync(this.config.ssl_cert)
      };
      server = https;
    }
    this.server = server.createServer(sslConf, function (req, res) {
      let pathObj = url.parse(req.url, true);
      let staticPath = path.resolve(process.cwd(), 'public');
      let filePath = path.join(staticPath, pathObj.pathname);
      fs.readFile(filePath, 'binary', function (err, fileContent) {
        if (err) {
          res.writeHead(404, 'not found')
          res.end('<h1>404 Not Found</h1>')
        } else {
          res.write(fileContent, 'binary')
          res.end()
        }
      });
    }).listen(this.config.port);
  }
}
module.exports = HttpServer;