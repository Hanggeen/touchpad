const STORE = require('./store');
module.exports = class Poster{
  constructor(ws) {
    console.log('发送器');
    this.code = '';
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
      this.handleInitPoster(msg);
    }

    if (msg.type === 'track') {
      this.handleTrack(msg);
    }

  }

  /**
   * 发送器注册
   * @param {Object} msg 
   */
  handleInitPoster(msg) {
    this.code = msg.code;
    const code = msg.code;
    console.log(`[${code}]接收到发送器注册`);

    // 判断原来是否已有发送器
    if (STORE.test(code) && STORE.test(code, 'poster')) {
      console.log(`[${code}]已有发送器，原有发送器将被销毁`);
      STORE.send(code, 'poster', {
        type: 'msg',
        action: 'overwritten',
        msg: 'The connection have been overwritten'
      });
      // TODO将它close掉
    }

    if (STORE.test(code) && STORE.test(code, 'listener')) {
      STORE.set(code, 'poster', this.ws);
    } else {
      
    }

    let config = STORE.getConf(code);

    STORE.send(code, 'poster', {
      type: 'answer',
      action: 'init',
      status: 'ok',
      data: config
    });
    
    STORE.send(code, 'listener', {
      type: 'msg',
      action: 'join'
    });
  }
  
  handleTrack(msg) {
    const code = this.code;
    // 判断原来是否已有发送器
    if (STORE.test(code) && STORE.test(code, 'listener')) {
      STORE.send(code, 'listener', msg);
    } else {
      STORE.send(code, 'poster', {
        type: 'msg',
        action: 'error'
      })
    }
  }

  handleClose() {
    const code = this.code;
    if (STORE.test(code) && STORE.test(code, 'listener')) {
      STORE.send(code, 'listener', {
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