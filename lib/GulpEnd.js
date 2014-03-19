var through2 = require('through2');
var gutil = require('gulp-util');
module.exports = function(cb) {
	function transform (file, enc, next) {
        return next();
    }    
    return through2.obj(transform, cb);
}