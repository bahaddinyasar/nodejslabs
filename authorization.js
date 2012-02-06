var everyauth = require('everyauth');

module.exports = function(app) {
  
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
    .redirectPath('/login');
  
  
    app.all('/secure*', function(req, res, next) {
        console.dir(req.session);
        if (req.session.auth && req.session.auth.loggedIn)
            next();
        else
            res.send('Not Authorized', 403);
    });
};