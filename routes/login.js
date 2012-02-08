module.exports = function(app) {
    
    app.get('/login', function(req, res) {
        if (req.session.auth == undefined || !req.session.auth.loggedIn)
            res.render('login');
        else
            res.redirect('/secure/');
    });
}