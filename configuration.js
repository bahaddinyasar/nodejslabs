var express = require('express'),
    everyauth = require('everyauth');

module.exports.boot = function (app) {

    app.register('.html', require('jade'));
    
    app.set("view options", {
        layout: false
    });
    
    app.configure(function() {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: "nodejslabssecret" }));
        app.use(everyauth.middleware());
        app.set('view engine', 'jade');
    	app.use(express.logger());
    	app.use(app.router);
    	app.use(express.static(__dirname + '/public'));
    });

    everyauth.helpExpress(app);

};