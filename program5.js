var through2 = require('through2');
var split   = require('split');
var stream = through2(write, end);

var lines = 0

function write(buffer, encoding, next) {
	if (lines % 2 === 0) {
		this.push(buffer.toString().toLowerCase() + '\n');
	} else {
		this.push(buffer.toString().toUpperCase() + '\n');
	}
	lines++;	
	next();
}

function end(done) {
	done();
}

process.stdin.pipe(split()).pipe(stream).pipe(process.stdout)