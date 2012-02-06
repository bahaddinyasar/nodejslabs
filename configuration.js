var express = require('express'),
    everyauth = require('everyauth');

module.exports.boot = function (app) {
    
    require('./authorization.js')(app,everyauth); 
    
    app.configure(function() {
    	app.use(express.logger());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: "nodejslabssecret" }));
        app.use(everyauth.middleware());
        app.set('view engine', 'jade');
        app.set("view options", {layout: false});
    	app.use(app.router);
    	app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    everyauth.helpExpress(app);

};