export default class Scroller {
  set(y) {
    let height = document.body.scrollTop || document.documentElement.scrollTop;
    height -= Math.round(y * 3);
    document.body.scrollTop = document.documentElement.scrollTop = height;
  }
}