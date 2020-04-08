const os = require('os');
exports.getIPAdress = function() {
  let localIPAddress = "";
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
          let alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              console.log(alias.address);
              localIPAddress = alias.address;
              break;
          }
      }
  }
  localIp = localIPAddress;
  return localIPAddress;
}