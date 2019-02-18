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

export function randomString(len) {
	len = len || 6;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	var maxPos = chars.length;
	var code = '';
	for (var i = 0; i < len; i++) {
		code += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return code;
}