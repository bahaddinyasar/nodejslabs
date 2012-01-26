var fs = require('fs');

module.exports.getFileContents = function(filepath,callback) {
	fs.readFile(filepath, 'utf8', function(err, data) {
		if (err) {
			console.log('getFileContents error: '+err);
		}
		callback(data);
	});
};
module.exports.getDirectoryContents = function(dirpath, fileExtension, callback) {
	fs.readdir(dirpath, function(err, data) {
		if (err) {
			console.log('getDirectoryContents error: ' + err);
		}
		var filteredArray = data.filter(function(item) {
			return fileExtension ? item.match(new RegExp('\.' + fileExtension + '$')) : true;
		});
		callback(filteredArray);
	});
};
  
