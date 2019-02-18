import pointerhtml from '../template/pointer.html'
import {str2dom} from '../modules/tools'
export default class Pointer {
  constructor () {
    this.dom = str2dom(pointerhtml)[0]
    document.getElementsByTagName('body')[0].appendChild(this.dom)
    this.pointerX = 0;
    this.pointerY = 0;
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