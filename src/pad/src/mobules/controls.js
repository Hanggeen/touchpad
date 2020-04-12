class Controls {
  constructor() {
    this.default = 'mouse';

    this.mouse = document.getElementById('mouse');
    this.gesture = document.getElementById('gesture');

    this.mouse.addEventListener('click', this.handlerMouse.bind(this));
    this.gesture.addEventListener('click', this.handlerGesture.bind(this));
  }

  handlerMouse() {
    this.mouse.classList.add('active');
    this.gesture.classList.remove('active');
    this.switchCb && this.switchCb('mouse');
  }
  handlerGesture() {
    this.gesture.classList.add('active');
    this.mouse.classList.remove('active');
    this.switchCb && this.switchCb('gesture');
  }
  listen(cb) {
    this.switchCb = cb;
  }
}
export default new Controls();