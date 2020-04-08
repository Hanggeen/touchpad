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
      this._registerCallback = (msg) => {
        this._registerCallback = null;
        if (msg.type === 'answer' && msg.action === 'init') {
          resolve(msg.status);
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

  _onerror() {
    this.work = false;
    // TODO show Toast
  }

  _onclose() {
    this.work = false;
    // TODO show Toast
  }

  _onmessage(message) {
    const msg = JSON.parse(message.data);
    this._registerCallback && this._registerCallback(msg);
    this._messageCallback && this._messageCallback(msg);
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  messageHandler(cb) {
    this._messageCallback = cb;
  }

}