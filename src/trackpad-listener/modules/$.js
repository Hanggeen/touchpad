export default function (param) {
  if (param[0] == '#') {
    return document.getElementById(param.slice(1))
  }
  return document.querySelector(param)
}