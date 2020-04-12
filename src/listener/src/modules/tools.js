export function str2dom (str) {
  var objE = document.createElement("div");
  objE.innerHTML = str;
  return objE.childNodes[0];
}