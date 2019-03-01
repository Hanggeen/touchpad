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
    this.bindCallback = {}
    this.connectionCount = 0

    this.pointer = new Pointer()
    this._initWebSocket()
    this._initSuspend()
  }
  _initSuspend() {
    const dom = str2dom(suspend)[0];
    document.getElementsByTagName('body')[0].appendChild(dom);
    $('#_trackpad').onclick = ()=>{
      let qrcodedom = $('#_trackpad_qrcode');
      qrcodedom.style.display = qrcodedom.style.display == 'none' ? 'flex' : 'none'
    }
    new QRCode($("#_trackpad_qrcode"), {
      text: this.pageurl + "?ws=" + this.wsurl + '&co=' +this.code,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
  _initWebSocket() {
    let wsurl;
    if (document.location.protocol === 'https:') {
      wsurl = `wss://${this.wsurl}`
    } else {
      wsurl = `ws://${this.wsurl}`
    }
    let ws = new WebSocket(wsurl);
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
            this._changeStatus(`已接入/${this.connectionCount}连接`)
          }
          if (msg.action == 'connect' && msg.code == 0) {
            this.connectionCount++
            this._changeStatus(`已接入/${this.connectionCount}连接`)
            this._showToast('有远端接入')
            this.pointer.show()
          }
          if (msg.action == 'disconnect' && msg.code == 0) {
            this.connectionCount--
            this._changeStatus(`已接入/${this.connectionCount}连接`)
            this._showToast('有远端断开')
            // 无接入，隐藏鼠标
            if (this.connectionCount === 0) {
              this.pointer.hide()
            }
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
          if (msg.action == 'change') {
            if (msg.data == 'mouse') {
              this.pointer.show()
            } else {
              this.pointer.hide()
            }
          }
        }
    })
  }
  _changeStatus(text) {
    $('#_trackpad_tips').innerHTML = text;
  }
  showQrcode() {
    $('#_trackpad_qrcode').style.display = 'flex';
  }
  hideQrcode() {
    $('#_trackpad_qrcode').style.display = 'none';
  }
  on(type, callback) {
    if (['click','swipe','change'].indexOf(type) != -1) {
      this.bindCallback[type] = function(e){
        callback(e)
      }
    }
  }
  _showToast(text) {
    clearTimeout(this.timer)
    $('#_trackpad_toast').classList.add('active');
    $('#_trackpad_toast').innerHTML = text;
    this.timer = setTimeout(function(){
      $('#_trackpad_toast').classList.remove('active');
    }, 3000)
  }
}
export {TrackPad};