module.exports = function(app) {
  
    app.get('/secure/*', function(req, res, next) {
        if (req.session.auth == undefined || !req.session.auth.loggedIn)
            res.redirect('/login');
        else
            next();
    });

    app.get('/secure/', function(req, res) {
        if (req.session.auth.twitter)
            res.redirect('/secure/twitterUser');
        else if (req.session.auth.facebookUser)
            res.redirect('/secure/facebookUser');        
    });
    
    app.get('/secure/twitterUser', function(req, res) {
        res.render('twitterUser');
    });

    app.get('/secure/facebookUser', function(req, res) {
        res.render('facebookUser');
    });

    app.get('/secure/session', function(req, res) {
        res.render('session_vars',{'session':req.session});
    });
};