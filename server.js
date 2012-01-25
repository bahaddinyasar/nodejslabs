var express = require('express'),
    app = express.createServer(),
    fs = require('fs');

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

app.get('/code', function(req, res) {
	fs.readFile(__filename, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		res.send(data);
	});
});


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);