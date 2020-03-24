module.exports = class Demo {
  constructor() {
    setTimeout(this.say.bind(this), 2000);
    this.say();
  }
  say() {
    this.haha();
  }
  haha() {
    console.log('haha')
  }
}