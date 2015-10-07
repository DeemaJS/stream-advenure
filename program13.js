var combine = require('stream-combiner')
var split   = require('split')
var through = require('through')
var zlib = require('zlib')

module.exports = function () {
	var grouper = {
		genres: {},
		genre_cur: undefined,
		onRow: function (row) {
			if (row.type === 'genre') {
				genre_old = this.genre_cur;
				if (this.genre_cur = row.name) {
					this.genres[this.genre_cur] = {
						name: this.genre_cur,
						books: []
					}
				}
				return this.genres[genre_old];
			}

			if (row.type === 'book') {
				this.genres[this.genre_cur].books.push(row.name);
				return null;	
			}
    }
	}
	return combine(
		split(),
		through(function (text) {
			if (text.length > 0) this.push(JSON.parse(text))
		}),
		through(function write (row) {
			record = grouper.onRow(row);
			if (record) {
				json = JSON.stringify(record);
				this.push(json + '\n');
			}
		}, function end () {
			record = grouper.onRow({type: 'genre', name: undefined});
			json = JSON.stringify(record);
			this.push(json + '\n');
			this.push(null);
		}),
		zlib.createGzip()
		);
}