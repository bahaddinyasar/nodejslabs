var express = require('express');

// to make util global, omit var.
dbconnection = require('mongoskin').db(config.db.mongodb);

everyauth = require('everyauth');

module.exports.boot = function (app) {
    
    //TODO: move everyauth logic to authorization.js
    
    var usersById = {};
    var nextUserId = 0;
    var usersByTwitId = {};
    function addUser (source, sourceUser) {
      var user;
       // non-password-based
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
      
      return user;
    }

    everyauth.debug = true;
    everyauth.twitter
    .consumerKey(config.twitter.consumerKey)
    .consumerSecret(config.twitter.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
      return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/secure/twitterUser');

    app.register('.html', require('jade'));
    
    app.set("view options", {
        layout: false
    });
    
   app.configure(function() {
    	app.use(express.logger());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: "nodejslabssecret" }));
        app.use(everyauth.middleware());
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.set("view options", {layout: false});
    	app.use(app.router);
    	app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    everyauth.helpExpress(app);

};