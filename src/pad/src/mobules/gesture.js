export default class Gesture {
  constructor(dom) {
    this.dom = dom;
  }
  async init() {
    let Hammer = await this.getHammer();
    console.log(this.dom);
    const gestureDomHammer = new Hammer(this.dom, {});
    gestureDomHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    // gestureDomHammer.on('tap', this.swipeHandler.bind(this));
    gestureDomHammer.on('tap swipeleft swiperight swipeup swipedown', this.swipeHandler.bind(this));
    return true;
  }

  getHammer() {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: "hammerjs" */ 'hammerjs').then(Hammer => {
        console.log('完成加载');
        resolve(Hammer.default);
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
