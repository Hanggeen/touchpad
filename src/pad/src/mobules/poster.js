class Poster {
  constructor() {
  }
  register(url, code) {
    this.url = url;
    this.code = code;
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      // 打开WebSocket连接后立刻发送一条消息:
      this.ws.addEventListener("open", function() {
        ws.send(JSON.stringify({
          type: "operate",
          action: "init",
          code
        }))
      });
    })
  }
  send(data) {
    this.ws.send(JSON.stringify(data));
  }
}