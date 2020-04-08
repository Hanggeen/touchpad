// 保留开发
import Hammer from 'hammerjs';
export default class Gesture {
  constructor(dom) {
    this.dom = dom;
    this.init();
  }
  async init() {
    const gestureDomHammer = new Hammer(this.dom, {});
    gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureDomHammer.on('tap swipeleft swiperight swipeup swipedown', this.swipeHandler.bind(this));
    return true;
  }

  listen(cb) {
    this.swipeCb = cb;
  }

  swipeHandler(msg) {
    this.swipeCb && this.swipeCb(msg); 
  }

  show() {
    this.dom.style.display = 'block';
  }

  hide() {
    this.dom.style.display = 'none';
  }
}