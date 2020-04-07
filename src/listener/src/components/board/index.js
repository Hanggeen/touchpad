import './style.less';
import {str2dom} from '../../modules/tools';
import QRCode from 'qrcode';
import board from './template.html';
export default class Boarder {
  constructor(qrcodeUrl) {
    this.dom = str2dom(board);
    document.getElementsByTagName('body')[0].appendChild(this.dom);

    this._tips = document.getElementById('_trackpad_tips');
    this._qrcode = document.getElementById('_trackpad_qrcode');
    this._toast = document.getElementById('_trackpad_toast');

    this._qrcodeready = false;
    this.dom.onclick = this._onclick.bind(this);
  }

  toast(text) {
    clearTimeout(this.timer)
    this._toast .classList.add('active');
    this._toast.innerHTML = text;
    this.timer = setTimeout(() => {
      this._toast.classList.remove('active');
    }, 3000)
  }

  tips(text) {
    this._tips.innerHTML = text;
  }

  initQrcode(qrcodeUrl) {
    console.log(qrcodeUrl);
    qrcodeUrl = decodeURIComponent(qrcodeUrl);
    QRCode.toDataURL(
      qrcodeUrl,
      { width: 128, margin: 1, color: { dark: '#000' }, errorCorrectionLevel: 'L' },
      (error, value) => {
        if (!error) {
          this._qrcode.src = value;
          this._qrcodeready = true;
        } else {
          this.toast('二维码建立失败');
        }
      }
    );
  }

  _onclick() {
    if (this._qrcodeready) {
      if (this._qrcode.style.display === 'none') {
        this._qrcode.style.display = 'block';
      } else {
        this._qrcode.style.display = 'none';
      }
    }
  }

}