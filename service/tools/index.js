let os = require('os');

exports.randomString = function(len) {
	len = len || 6;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	var maxPos = chars.length;
	var code = '';
	for (var i = 0; i < len; i++) {
		code += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return code;
}