import './style.less';
import {str2dom} from '../../modules/tools';
import pointer from './template.html';
export default class Pointer {
  constructor() {
    this.dom = str2dom(pointer);
    this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;    
    this.pointerX = this.clientWidth/2;
    this.pointerY = this.clientHeight/2;
    document.getElementsByTagName('body')[0].appendChild(this.dom);
    this.dom.style.transform = `translate3d(${this.pointerX }px,${this.pointerY}px,0)`;
  }

  show() {
    this.dom.style.display = 'block';
  }

  hide() {
    this.dom.style.display = 'none';
  }

  set(x, y) {
    if (x > 0) {
      if (x > 5) {
        x = Math.round(Math.pow(1.4, x));
        if (x > 100) {
          x = 100;
        }
      }
    } else {
      if (x < -5) {
        x = 0 - Math.round(Math.pow(1.4, -x));
        if (x < -100) {
          x = -100;
        }
      }
    }
    if (y > 0) {
      if (y > 5) {
        y = Math.round(Math.pow(1.4, y));
        if (y > 100) {
          y = 100;
        }
      }
    } else {
      if (y < -5) {
        y = 0 - Math.round(Math.pow(1.4, -y));
        if (y < -100) {
          y = -100;
        }
      }
    }
    console.log(x, y);
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
    this.dom.style.transform = `translate3d(${this.pointerX }px,${this.pointerY}px,0)`;
  }

  get(x, y) {
    return {x, y};
  }

  click() {    
    document.elementFromPoint(Math.floor(this.pointerX)-1, Math.floor(this.pointerY)-1).click();
  }

}