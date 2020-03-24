const STORE = require('./store');
const {randomString} = require('./tools');

/**
 * Connect类：一个websocket连接
 * role/连接类型: listener/监听器, poster/发送器
 * code: 此器件对应在STORE中的code
 */
module.exports = class Connect {
  constructor(ws) {
    this.role = '';
    this.code = '';
    this.ws = ws;
    ws.on('message', this._handleMessage.bind(this));
    ws.on('close', this._handleClose.bind(this));
  }


  _handleMessage(message) {
    let msg = this._verify(message);
    if (!msg) {
      this._send({
        type: 'msg',
        code: 1,
        action: 'error',
        data: '解析数据错误'
      });
      return;
    }

    console.log('接收到消息');
    if (msg.type === 'center' && msg.action === 'init-listener') {
      console.log('注册监听器')
      this._handleInitListener(msg);
    }

    if (msg.type === 'center' && msg.action === 'init-poster') {
      console.log('注册发送器')
      this._handleInitPoster(msg);
    }

    if (msg.type === 'post') {
      console.log('普通时间')
      this._handlePostMessage(msg);
    }
  }

  /**
   * 接收器注册
   * @param {Object} msg 
   */
  _handleInitListener(msg) {
    console.log('接收到注册监听器');
    const code = randomString();
    console.log('生成随机码' + code);
    this.code = code;
    STORE[code] = {
      listener: this.ws
    }
    this.role = 'listener';
    STORE[code].listener.send(
      JSON.stringify({
        type: 'center',
        code: 0,
        action: 'init-listener',
        data: code
      })
    )
    return;
  }

  /**
   * 发送器注册
   * @param {Object} msg 
   */
  _handleInitPoster(msg) {
    console.log('接收到发送器注册');
    console.log(msg.code);
    if (
      STORE[msg.code] &&
      STORE[msg.code].poster &&
      STORE[msg.code].poster.readyState == 1
    ) {
      console.log('已有发送器，即将挤下线');
      STORE[msg.code].poster.send(
        JSON.stringify({
          type: 'center',
          code: 2,
          action: 'error',
          data: 'The connection have been overwritten'
        })
      )
    }

    if (STORE[msg.code]) {
      console.log('发送器重写');
      STORE[msg.code].poster = this.ws;
    } else {
      console.log('发送器写');
      STORE[msg.data] = {
        poster: this.ws
      }
    }

    this.role = 'poster';
    this.code = msg.code;
    STORE[msg.code].poster.send(
      JSON.stringify({
        type: 'center',
        code: 0,
        action: 'init-poster',
        data: 'success'
      })
    )

    if (
      STORE[msg.code].listener &&
      STORE[msg.code].listener.readyState == 1
    ) {
      STORE[msg.code].listener.send(
        JSON.stringify({
          type: 'center',
          code: 0,
          action: 'join',
          data: 'New connection joined'
        })
      )
    }
  }

  /**
   * 
   * @param {Object} msg 
   */
  _handlePostMessage(msg) {
    console.log('接收到post');
    console.log(msg);
    this._sendBro(msg);
  }
    
  _verify(message) {
    let msg;
    try {
      msg = JSON.parse(message)
    } catch (e) {
      console.log(e);
      return false;
    }
    return msg;
  }

  _send(data) {
    this.ws.send(JSON.stringify(data));
  }

  _sendBro(data) {
    console.log(this);
    console.log(`当前接到到是${this.role == 'listener' ? '监听器' : '发送器'}`)
    if (this.role === 'listener') {
      STORE[this.code].poster.send(JSON.stringify(data));
    }
    if (this.role === 'poster') {
      console.log(this.code);
      console.log(STORE[this.code]);
      STORE[this.code].listener.send(JSON.stringify(data));
    }
  }

  _handleClose() {
    // this._sendBro({
    //   type: 'center',
    //   code: 0,
    //   action: 'close',
    //   data: 'connection closed'
    // })
  }
}
