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

app.get('/code/:file?', function(req, res) {
	var filepath = req.params.file ? __dirname + '/' + req.params.file : __filename;
	util.getFileContents(filepath, function(data) {
		res.send(data);
	});
});


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);