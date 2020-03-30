export default class Toucher {
  constructor(dom) {
    this.dom = dom;
    console.log(dom);
    this.dom.addEventListener("touchstart", this.touchStart.bind(this));
    this.dom.addEventListener("touchmove", this.touchMove.bind(this));
    this.touchMoveCb = null;
  }
  
  // 开始触摸时，记住标记位置
  touchStart(e) {
    e.preventDefault()
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  }

  // 滑动时，设置标记位置、计算差值、发送事件
  touchMove(e) {
    if (this.touchMoveCb) {
      let X, Y;
      X = e.touches[0].pageX - this.startX;
      Y = e.touches[0].pageY - this.startY;
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      this.touchMoveCb({x:X, y:Y});
    }
  }

  listen(cb) {
    this.touchMoveCb = cb;
    console.log(this.touchMoveCb);
  }
}