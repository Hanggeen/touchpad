export function str2dom (str) {
  var objE = document.createElement("div");
  objE.innerHTML = str;
  return objE.childNodes;
}

export function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}