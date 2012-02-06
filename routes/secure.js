module.exports = function(app) {
  
    app.get('/login', function(req, res) {
        res.render('login');
    });
    
    app.get('/secure/session', function(req, res) {
        res.render('session_vars',{'session':req.session});
    });
};