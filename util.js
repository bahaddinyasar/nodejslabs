var fs = require('fs');

module.exports.getFileContents = function(filepath,callback) {
	fs.readFile(filepath, 'utf8', function(err, data) {
		if (err) {
			console.log('error: '+err);
		}
		callback(data);
	});
};