export default class Scroller {
  constructor(dom) {
    this.dom = dom;
    this.dom.addEventListener("touchstart", this.touchStart.bind(this));
    this.dom.addEventListener("touchmove", this.touchMove.bind(this));
    this.touchMoveCb = null;
  }
  
  // 开始触摸时，记住标记位置
  touchStart(e) {
    e.preventDefault()
    this.startY = e.touches[0].pageY;
  }

  // 滑动时，设置标记位置、计算差值、发送事件
  touchMove(e) {
    if (this.touchMoveCb) {
      let Y;
      Y = e.touches[0].pageY - this.startY;
      this.startY = e.touches[0].pageY;
      this.touchMoveCb({y:Y});
    }
  }

  listen(cb) {
    this.touchMoveCb = cb;
  }
}