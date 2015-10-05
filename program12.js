var through = require('through'),
    duplex = require('duplexer');

module.exports = function (counter) {
	var counts = {};	
	
	function rec_count (obj) {
		var country = obj.country;
		var count = counts[country] || 0;
		counts[country] = count + 1;	
	}

	function set_count (obj) {
		counter.setCounts(counts);
		counts = {}
	}

	return duplex(through(rec_count, set_count), counter);
};

