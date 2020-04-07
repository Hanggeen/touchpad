
import Hammer from 'hammerjs';
export default class Toucher {
  constructor(dom) {
    this.dom = dom;
    console.log(dom);
    this.dom.addEventListener("touchstart", this.touchStart.bind(this));
    this.dom.addEventListener("touchmove", this.touchMove.bind(this));
    // this.dom.addEventListener("click", this.click.bind(this));
    const gestureDomHammer = new Hammer(this.dom, {});
    gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureDomHammer.on('tap', this.click.bind(this));
    this.touchMoveCb = null;
  }
  
  // 开始触摸时，记住标记位置
  touchStart(e) {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  }

  // 滑动时，设置标记位置、计算差值、发送事件
  touchMove(e) {
    if (this.touchMoveCb) {
      let X, Y;
      X = e.touches[0].pageX - this.startX;
      Y = e.touches[0].pageY - this.startY;
      X = Math.round(X * 100) / 100;
      Y = Math.round(Y * 100) / 100;
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      this.touchMoveCb({x:X, y:Y});
    }
  }

  click(cb) {
    if (this.clickCb) {
      this.clickCb();
    }
  }

  listen(cb) {
    this.touchMoveCb = cb;
  }

  listenClick(cb) {
    console.log(2);
    this.clickCb = cb;
  }
}