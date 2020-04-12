export default class Scroller {
  set(y) {
    console.log(y);
    let height = document.body.scrollTop || document.documentElement.scrollTop;
    height -= Math.round(y * 3);
    console.log(height);
    document.body.scrollTop = document.documentElement.scrollTop = height;
  }
}