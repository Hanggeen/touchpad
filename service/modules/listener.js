const STORE = require('./store');
const {randomString} = require('../tools');
module.exports = class Listener{
  constructor(ws) {
    this.ws = ws;
    this.ws.on('message', this.handleMessage.bind(this));
    this.ws.on('close', this.handleClose.bind(this));
  }

  handleMessage(message) {
    let msg = this.verify(message);
    if (!msg) {
      return;
    }

    if (msg.type === 'operate' && msg.action === 'init') {
      this.handleInitListener(msg);
    }

  }

  /**
   * 发送器注册
   * @param {Object} msg 
   */
  handleInitListener(msg) {
    const code = randomString();
    console.log(`[${code}]接收到监听器注册`);

    STORE.set(code, 'listener', this.ws);
    STORE.setConf(code, msg.data);
    STORE.send(code, 'listener', {
      type: 'answer',
      action: 'init',
      status: 'ok',
      data: code
    });

  }
  
  
  handleClose() {
    const code = this.code;
    if (STORE.test(code) && STORE.test(code, 'poster')) {
      STORE.send(code, 'poster', {
        type: 'msg',
        action: 'quit'
      });
    }
  }

  verify(message) {
    // TODO 严格校验传送过来的格式
    let msg;
    try {
      msg = JSON.parse(message)
    } catch (e) {
      console.log(e);
      return false;
    }
    return msg;
  }
}