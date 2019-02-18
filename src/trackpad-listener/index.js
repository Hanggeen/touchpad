import './style/index.less'
import suspend from './template/suspend.html'
import {str2dom,randomString} from './modules/tools'
import Pointer from './modules/pointer'
import QRCode from '../libs/qrcode'
import $ from './modules/$'
class TrackPad {
  constructor(param = '127.0.0.1:3000') {
    if (typeof param == 'object') {
      this.wsurl = param.wsurl
      this.pageurl = param.pageurl || 'https://hanggeen.github.io/t/'
    } else if (typeof param == 'string') {
      this.wsurl = param
    } else {
      throw new Error('trackpad param error')
    }

    this.code = randomString()
    alert(this.code)
    this.bindCallback = {}



    this.pointer = new Pointer()
    this._initWebSocket()
    this._initSuspend()
  }
  _initSuspend() {
    const dom = str2dom(suspend)[0];
    document.getElementsByTagName('body')[0].appendChild(dom);
    $('#trackpad').onclick = ()=>{
      let qrcodedom = $('#qrcode');
      qrcodedom.style.display = qrcodedom.style.display == 'none' ? 'flex' : 'none'
    }
    new QRCode($("#qrcode"), {
      text: this.pageurl + "?ws=" + this.wsurl + '&co=' +this.code,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
  _initWebSocket() {
    let ws = new WebSocket(`ws://${this.wsurl}`);
    // 打开WebSocket连接后立刻发送一条消息:
    ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
          type: "center",
          code: this.code,
          action: "init-listener",
          data: this.code
        }))
    });
    // 响应收到的消息:
    ws.addEventListener('message', message => {
        var msg = JSON.parse(message.data);
        if (msg.type == 'center') {
          if (msg.action == 'init-listener' && msg.code == 0) {
            this._changeStatus('已接入')
          }
        } else if (msg.type == 'post') {
          if (msg.action == 'slide') {
            this.pointer.set(msg.data.x, msg.data.y)
          }
          if (msg.action == 'click') {
            var pos = this.pointer.get()
            document.elementFromPoint(Math.floor(pos.x)-1, Math.floor(pos.y)-1).click();
            if (this.bindCallback.click) {
              this.bindCallback.click(msg)
            }
          }
          if (msg.action == 'scroll') {
            let height = document.body.scrollTop || document.documentElement.scrollTop;
            height -= Math.round(msg.data.y * 3);
            document.body.scrollTop = document.documentElement.scrollTop = height;
            console.log(msg.data.x, msg.data.y);
          }
          if (msg.action == 'swipe') {
            if (this.bindCallback.swipe) {
              this.bindCallback.swipe(msg)
            }
          }
        }
    })
  }
  _changeStatus(text) {
    $('#tips').innerHTML = text;
  }
  showQrcode() {
    $('#qrcode').style.display = 'flex';
  }
  hideQrcode() {
    $('#qrcode').style.display = 'none';
  }
  on(type, callback) {
    if (['click','swipe'].indexOf(type) != -1) {
      this.bindCallback[type] = function(e){
        callback(e)
      }
    }
  }
  _showToast(text) {
    clearTimeout(this.timer)
    $('#toast').classList.add('active');
    $('#toast').innerHTML = text;
    this.timer = setTimeout(function(){
      $('#toast').classList.remove('active');
    }, 3000)
  }
}
export {TrackPad};