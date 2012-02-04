module.exports = function(app) {
    
    app.get('/code/:fileName?', function(req, res) {
        var filepath = req.params.fileName ? __dirname + '/' + req.params.fileName : __filename;
    	util.getFileContents(filepath, function(data) {
    		res.send(data);
    	});
    });
    
    app.get('/files/:fileExtension?', function(req, res) {
    	util.getDirectoryContents(__dirname,req.params.fileExtension, function(data) {
    		res.json(data);
    	});
    });

}