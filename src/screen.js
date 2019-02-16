import './style.less'
class RemoveReceiver {
  constructor(param = '10.13.131.182:3000') {
    if (typeof param == 'object') {
      this.wsurl = param.wsurl
      this.pageurl = param.pageurl || 'https://hanggeen.github.io/t/'
    } else if (typeof param == 'string') {
      this.wsurl = param
    } else {
      throw new Error('trackpad param error')
    }
    this.qrcodeon = false;
    this._initPointer()
    this._initWebSocket()

    this.bindhandler = {}

    var qrcode = new QRCode(this.$("#qrcode"), {
      text: this.pageurl + "?ws=" + this.wsurl,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    this.$('#trackpad').onclick = ()=>{
      if (this.$('#qrcode').style.display == 'none') {
        this.$('#qrcode').style.display = 'flex'
      } else {
        this.$('#qrcode').style.display = 'none'
      }
    }
  }
  $(param) {
    if (param[0] == '#') {
      return document.getElementById(param.slice(1))
    }
    return document.querySelector(param)
  }
  _initPointer() {
    this.pointerX = 0;
    this.pointerY = 0;
    if (this.$('#_Pointer') == null) {
      var pointer = document.createElement('div');
      pointer.setAttribute('id', '_Pointer');
      pointer.setAttribute('style',  "z-index:999999;position:fixed;width:11px;height:17px;left:0px;top:0px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARBAMAAAD5z0voAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9agToZAAAADnRSTlMADDx3JLOnYDAYm4NrSMnfdYcAAABcSURBVAjXY+CfyAAC/z4JgKn3imDqHZALooBcEAXkgiggF0SBuGDqvQKI+v+tAKjv3dfFQN7Xf+9PCDD4Z/97b8LAIFTU/+6vAAPjRPl3nx2A5rD8DwZRjMpGAgBjcjVBzNw01wAAAABJRU5ErkJggg==)")
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
        if (msg.action == 'slide') {
          this._setPointer(msg.data.x, msg.data.y);
        }
        if (msg.action == 'click') {
          document.elementFromPoint(Math.floor(this.pointerX)-1, Math.floor(this.pointerY)-1).click();
          if (this.bindhandler.click) {
            this.bindhandler.click(msg)
          }
        }
        if (msg.action == 'scroll') {
          let height = document.body.scrollTop || document.documentElement.scrollTop;
          height -= Math.round(msg.data.y * 3);
          document.body.scrollTop = document.documentElement.scrollTop = height;
          console.log(msg.data.x, msg.data.y);
        }
        if (msg.action == 'swipe') {
          if (this.bindhandler.swipe) {
            this.bindhandler.swipe(msg)
          }
        }
        if (msg.type == 'register') {
          this._changeTips('已接入')
        }
    })
  }
  _setPointer(x, y) {
    this.pointerX += x;
    this.pointerY += y;
    this.pointer.style.left = this.pointerX + 'px';
    this.pointer.style.top = this.pointerY + 'px';
  }
  _changeTips(text) {
    this.$('#tips').innerHTML = text;
  }
  showQrcode() {
    this.$('#qrcode').style.display = 'flex';
  }

  hideQrcode() {
    this.$('#qrcode').style.display = 'none';
  }
  on(type, callback) {
    if (['click','swipe'].indexOf(type) != -1) {
      this.bindhandler[type] = function(e){
        callback(e)
      }
    }
  }
  _showToast(text) {
    clearTimeout(this.timer)
    this.$('#toast').classList.add('active');
    this.$('#toast').innerHTML = text;
    this.timer = setTimeout(function(){
      this.$('#toast').classList.remove('active');
    }, 3000)
  }
}

export {RemoveReceiver};