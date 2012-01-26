var express = require('express'),
    app = express.createServer(),
    util = require('./util.js');

app.register('.html', require('jade'));
app.set("view options", {
    layout: false
});

app.configure(function() {
    app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.logger());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

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


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);