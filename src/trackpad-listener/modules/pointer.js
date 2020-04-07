import pointerhtml from '../template/pointer.html'
import {str2dom} from '../modules/tools'
export default class Pointer {
  constructor () {
    this.pointerWidth = 11;
    this.dom = str2dom(pointerhtml)[0]
    console.log(this.dom);
    document.getElementsByTagName('body')[0].appendChild(this.dom)
    this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.dom.style.left = this.clientWidth/2 + 'px'
    this.dom.style.top = this.clientHeight/2 + 'px'
    this.pointerX = this.clientWidth/2
    this.pointerY = this.clientHeight/2
  }
  show() {
    this.dom.style.display = 'block'
  }
  hide () {
    this.dom.style.display = 'none'
  }
  set (x, y) {
    this.pointerX += x;
    this.pointerY += y;
    if (this.pointerX + this.pointerWidth > this.clientWidth) {
      this.pointerX = this.clientWidth - this.pointerWidth
    }
    if (this.pointerY + this.pointerWidth  > this.clientHeight) {
      this.pointerY = this.clientHeight - this.pointerWidth
    }
    if (this.pointerX < 0) {
      this.pointerX = 0
    }
    if (this.pointerY < 0) {
      this.pointerY = 0
    }
    this.dom.style.left = this.pointerX + 'px';
    this.dom.style.top = this.pointerY + 'px';
  }
  get () {
    return {
      x: this.pointerX,
      y: this.pointerY
    }
  }
}