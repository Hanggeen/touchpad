class Tips {
  constructor(dom) {
    this.dom = dom;
    this.timer = null;
  }
  show(text) {
    clearTimeout(this.timer);
    this.dom.innerHTML = text;
    this.dom.classList.add('active');
    this.timer = setTimeout(() => {
      this.dom.classList.remove('active');
    }, 2000);
  }
}

export default new Tips(document.getElementById('tips'));