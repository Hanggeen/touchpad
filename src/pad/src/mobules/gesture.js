export default class Gesture {
  constructor(dom) {
    this.dom = dom;
  }
  async init() {
    let Hammer = await this.getHammer();
    const gestureDomHammer = new Hammer(this.dom, {});
    gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureDomHammer.on('tap swipeleft swiperight swipeup swipedown', this.swipeHandler);
    return true;
  }

  getHammer() {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: "hammerjs" */ 'hammerjs').then(Hammer => {
        console.log('完成加载');
        resolve(Hammer);
      })
    })
  }

  listen(cb) {
    this.swipeCb = cb;
  }

  swipeHandler(msg) {
   this.swipeCb && this.swipeCb(msg); 
  }
}