class Timer {
  constructor() {
    this.timetips = document.getElementById('time');
    this.second = 1;
  }
  start() {
    this.timer = setInterval(() => {
      var s = this.second;
      var t;
      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
          t = '0' + hour + ":";
        } else {
          t = hour + ":";
        }

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; };
        t += sec;
      }
      this.timetips.innerHTML = t;
      this.second++;
    }, 1000)
  }
  stop() {
    clearInterval(this.timer);
  }
  reset() {
    this.second = 1;
    clearInterval(this.timer);
    this.timetips.innerHTML = '00:00:00';
  }
}

export default new Timer();