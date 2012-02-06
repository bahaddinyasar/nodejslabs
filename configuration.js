var express = require('express'),
    everyauth = require('everyauth');

module.exports.boot = function (app) {
    
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
    .consumerKey('RrOhI3kPbI3fsaIjYklKkg')
    .consumerSecret('l8oH2Ela9WV0UFfdGrF62kuGXU1qKhZjO3dvIdJ7h0')
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
      return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/secure');

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
        app.set('view engine', 'jade');
    	app.use(app.router);
    	app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    everyauth.helpExpress(app);

};