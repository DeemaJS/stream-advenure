var through2 = require('through2');
var trumpet = require('trumpet');
var tr = trumpet();

var toUpper = function (buffer, _, next) {
	this.push(buffer.toString().toUpperCase());	
	next();	
}

var stream = tr.select('.loud').createStream();

process.stdin.pipe(tr).pipe(process.stdout);
stream.pipe(through2(toUpper)).pipe(stream);
