class Store {
  constructor() {
    this.controls = {}
  }

  set(code, type, ws) {
    if (this.controls[code]) {
      return false
    }
    if (this.controls[code]) {
      this.controls[code][type] = ws
    } else {
      this.controls[code] = {
        [type]: ws
      }
    }
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
