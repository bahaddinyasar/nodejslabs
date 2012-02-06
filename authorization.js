var everyauth = require('everyauth');

module.exports = function(app) {
  
    
  
  
    app.all('/secure*', function(req, res, next) {
        console.dir(req.session);
        if (req.session.auth && req.session.auth.loggedIn)
            next();
        else
            res.send('Not Authorized', 403);
    });
};