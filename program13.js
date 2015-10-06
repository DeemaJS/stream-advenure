var combine = require('stream-combine')
var split   = require('split')
var through = require('through')
var zlib = require('zlib')

module.exports = function () {
	var titleByGenre = {}
	return duplex(child.stdin, child.stdout);
};