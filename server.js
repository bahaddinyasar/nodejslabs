var express = require('express');

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.logger());
	app.use(app.router);
	app.use(express.static(__dirname + '/public')); // url: http://..../createUser.html
	// app.use('/public',express.static(__dirname + '/public')); // url:  http://..../public/createUser.html
});

app.get('/', function(req, res) {
    res.send('Hello Nodejslabs\n');
	//res.render('index.html');
});

app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);