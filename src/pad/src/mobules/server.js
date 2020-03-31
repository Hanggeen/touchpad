export default class Server {
  constructor() {
  }
  async init(url, code) {
    this.url = url;
    this.code = code;

    let connect = await this._connect(this.url).catch();
    if (!connect) {
      console.log(`[${code}]发起连接失败`);
      return;
    }

    this.ws.onmessage = this._onmessage.bind(this);
    this.ws.onerror = this._onerror.bind(this);
    this.ws.onclose = this._onclose.bind(this);

    console.log(this.code);
    let register = await this._register().catch();
    if (!register) {
      console.log(`[${code}]发起注册失败`);
      return;
    }

    return true;

  }

  _connect(url) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);  
      this.ws.addEventListener("open", () => {
        resolve(true);
      });
    })
  }

  _register() {
    return new Promise((resolve, reject) => {
      this._openCallback = (msg) => {
        this._openCallback = null;
        if (msg.type === 'answer' && msg.action === 'init') {
          resolve(msg.data);
        } else {
          reject();
        }
      }
      this.send({
        type: "operate",
        action: "init",
        code: this.code
      });
    })
  }

  _onopen() {
    this._openCallback && this._openCallback();
  }

  _onerror() {
    this.work = false;
    // TODO show Toast
  }

  _onclose() {
    this.work = false;
    // TODO show Toast
  }

  _onmessage(msg) {
    this._openCallback && this._openCallback(msg);
    this._messageCallback && this._messageCallback(msg);
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  messageHandler(cb) {
    this._messageCallback = cb;
  }

}