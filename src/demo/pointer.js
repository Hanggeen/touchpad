class Pointer {
  constructor() {
    this.pointer = document.getElementById("pointer");
    this.pointerLocation = [
      [[12, 12], [170, 12], [328, 12], [486, 12]],
      [[12, 170], [170, 170], [328, 170], [486, 170]],
      [[12, 328], [170, 328], [328, 328], [486, 328]],
    ];

    this.pointerXY = [0, 0];
  }
  show() {
    this.pointer.style.display = 'block';
  }
  hide() {
    this.pointer.style.display = 'none';
  }
  set(pos) {
    if (pos === 'left' && this.pointerXY[1] > 0) {
      this.pointerXY[1] -= 1;
    }
    if (pos === 'right' && this.pointerXY[1] < 3) {
      this.pointerXY[1] += 1;
    }
    if (pos === 'up' && this.pointerXY[0] > 0) {
      this.pointerXY[0] -= 1;
    }
    if (pos === 'down' && this.pointerXY[0] < 2) {
      this.pointerXY[0] += 1;
    }
    let xy = this.pointerLocation[this.pointerXY[0]][this.pointerXY[1]];
    this.pointer.style.transform = `translate(${xy[0]}px,${xy[1]}px)`;
  }
  get() {
    return this.pointerXY;
  }
}

export default new Pointer();