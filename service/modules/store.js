class Store {
  constructor() {
    this.controls = {}
  }

  set(code, type, ws) {
    console.log(Object.keys(this.controls));
    if (type === 'listener' && this.controls[code]) {
      return false
    }
    if (this.controls[code]) {
      this.controls[code][type] = ws
    } else {
      this.controls[code] = {
        [type]: ws
      }
    }
    console.log(`[${code}]${type}写入`);
    return true
  }

  send(code, type, data) {
    if (
      this.controls[code] &&
      this.controls[code][type] &&
      this.controls[code][type].readyState === 1
    ) {
      this.controls[code][type].send(JSON.stringify(data))
      return true
    }
    console.log('返回失败');
    return false
  }

  test(code, type) {
    if (type) {
      return (
        this.controls[code] &&
        this.controls[code][type] &&
        this.controls[code][type].readyState === 1
      )
    } else {
      return this.controls[code]
    }
  }
}

module.exports = new Store()
