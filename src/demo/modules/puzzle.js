class Puzzle {
  constructor() {
    this.area = document.getElementById("area");
    this.area.onclick = this.click.bind(this);
    this.cubeLocation = [
      [0,0], [158, 0], [316, 0],
      [0,158], [158, 158], [316, 158],
      [0,316], [158, 316], [316, 316],
    ];
    this.status = [0,1,2,3,4,5,6,7,8];
    this.available = [
      [1,3],[0,2,4],[1,5],[0,4,6],[1,3,5,7],[2,4,8],[3,7],[4,6,8],[5,7]
    ];
    this.running = false;
  }
  render(){
    for(let i = 0; i< 9; i++) {
      let j = this.status[i];
      this.area.children[j].style.transform = `translate(${this.cubeLocation[i][0]}px, ${this.cubeLocation[i][1]}px)`;
    }
  }
  start() {
    for(let i = 0; i < 100; i++) {
      let index = this.status.indexOf(8);
      let ava = this.available[index];
      let trans = ava[Math.floor(Math.random()*ava.length)];
      let val = this.status[trans];
      this.status[trans] = this.status[index];
      this.status[index] = val;
    }
    this.render();
    this.running = true;
  }

  pick(n) {
    let p9 = this.status.indexOf(8);
    if (this.available[p9].indexOf(n) !== -1) {
      let a = this.status[p9];
      this.status[p9] = this.status[n];
      this.status[n] = a;
      this.render();
      this.test();
    }
  }

  click(e) {
    let ele = e.target;
    let i=0;
    while(ele = ele.previousElementSibling){
      i++;
    }
    console.log(this.status.indexOf(i));
    if (this.running ){
      this.pick(this.status.indexOf(i));
    }
  }

  reset() {
    this.status = [0,1,2,3,4,5,6,7,8];
    this.render();
    this.running = true;
  }

  stop() {
    this.area.style.opacity = 0;
    this.running = false;
  }

  end() {
    this.running = false;
  }

  recover() {
    this.area.style.opacity = 1;
    this.running = true;
  }

  test() {
    let res = true;
    for(let i = 0; i < this.status.length; i++) {
      if (i != this.status[i]) {
        res = false;
      }
    }
    if (res) {
      setTimeout(() => {
        this.successcb();
      }, 1500);
    }
  }

  success(cb) {
    this.successcb = cb;
  }

}

export default new Puzzle();