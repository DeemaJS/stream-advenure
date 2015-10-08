var crypto = require('crypto'),
    zlib = require('zlib'),
    tar = require('tar'),
    through = require('through'),
    parser = tar.Parse();

parser.on('entry', function (entry) {
    if(entry.type !== 'File') return;
   
    function write(data) {
        this.queue(data.toString() + ' ' + entry.path + '\n');
    }

    entry.pipe(crypto.createHash('md5', { encoding : 'hex' }))
         .pipe(through(write))
         .pipe(process.stdout);
});

process.stdin
    .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
    .pipe(zlib.createGunzip())
    .pipe(parser);