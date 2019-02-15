class RemoveReceiver {
  constructor(url = '10.13.131.182:3000') {
    this.wsurl = url
    this._initPointer()
    this._initWebSocket()
  }
  _initPointer() {
    this.pointerX = 0;
    this.pointerY = 0;
    if (document.getElementById('_Pointer') == null) {
      var pointer = document.createElement('div');
      pointer.setAttribute('id', '_Pointer');
      pointer.setAttribute('style',  "position:fixed;width:11px;height:17px;left:0px;top:0px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARBAMAAAD5z0voAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9agToZAAAADnRSTlMADDx3JLOnYDAYm4NrSMnfdYcAAABcSURBVAjXY+CfyAAC/z4JgKn3imDqHZALooBcEAXkgiggF0SBuGDqvQKI+v+tAKjv3dfFQN7Xf+9PCDD4Z/97b8LAIFTU/+6vAAPjRPl3nx2A5rD8DwZRjMpGAgBjcjVBzNw01wAAAABJRU5ErkJggg==)")
      document.getElementsByTagName('body')[0].appendChild(pointer);
      this.pointer = pointer
    }
  }
  _initWebSocket() {
    let ws = new WebSocket(`ws://${this.wsurl}`);
    // 打开WebSocket连接后立刻发送一条消息:
    ws.addEventListener('open', function () {
        ws.send(JSON.stringify({
          type: 'init-listener',
          data: 'first'
        }));
    });
    // 响应收到的消息:
    ws.addEventListener('message', message => {
        var msg = JSON.parse(message.data);
        console.log(msg)
        if (msg.action == 'slide') {
          this._setPointer(msg.data.x, msg.data.y);
        }
        if (msg.action == 'click') {
          document.elementFromPoint(Math.floor(this.pointerX)-1, Math.floor(this.pointerY)-1).click()
        }
        if (msg.action == 'scroll') {
          let height = document.body.scrollTop || document.documentElement.scrollTop;
          height -= Math.round(msg.data.y * 3);
          document.body.scrollTop = document.documentElement.scrollTop = height;
          console.log(msg.data.x, msg.data.y);
        }
    })
  }
  _setPointer(x, y) {
    this.pointerX += x;
    this.pointerY += y;
    this.pointer.style.left = this.pointerX + 'px';
    this.pointer.style.top = this.pointerY + 'px';
  }
}
