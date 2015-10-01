var through2 = require('through2');
var http = require('http');

var toUpper = function (buffer, _, next) {
	this.push(buffer.toString().toUpperCase());	
	next();	
}

var server = http.createServer(function (req, res) {
	if (req.method === 'POST') {
		req.pipe(through2(toUpper)).pipe(res);
	}	
});

server.listen(process.argv[2]);