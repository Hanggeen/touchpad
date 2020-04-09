export default class Server {
  constructor(config) {
    this.work = false;
    this.url = config.url;
    this.trackType = config.trackType;
    this.ws = null;
  }
  async init() {

    let connect = await this.connect(this.url).catch();
    if (!connect) {
      console.log(`[${code}]发起连接失败`);
      return;
    }

    this.ws.onmessage = this.onmessage.bind(this);
    this.ws.onerror = this.onerror.bind(this);
    this.ws.onclose = this.onclose.bind(this);

    let register = await this.register().catch();
    if (!register) {
      console.log(`[${code}]发起注册失败`);
      return;
    }
    console.log(register);
    return register;

  }

  connect(url) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);  
      this.ws.addEventListener("open", () => {
        resolve(true);
      });
    })
  }

  register() {
    return new Promise((resolve, reject) => {
      this.registerCallback = (msg) => {
        this.registerCallback = null;
        if (msg.type === 'answer' && msg.action === 'init') {
          this.work = true;
          resolve(msg);
        } else {
          reject();
        }
      }
      this.send({
        type: "operate",
        action: "init",
        data: {
          trackType: this.trackType
        }
      });
    })
  }

  onerror() {
    this.work = false;
    this._errorCallback && this._errorCallback();
  }

  onclose() {
    this.work = false;
    this._closeCallback && this._closeCallback();
  }

  onmessage(message) {
    const msg = JSON.parse(message.data);
    this.registerCallback && this.registerCallback(msg);
    this._messageCallback && this._messageCallback(msg);
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  messageHandler(cb) {
    this._messageCallback = cb;
  }

  errorHandler(cb) {
    this._errorCallback = cb;
  }

  closeHandler(cb) {
    this._closeCallback = cb;
  }

}