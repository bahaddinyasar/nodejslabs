module.exports = function(app) {
  
    app.get('/secure', function(req, res) {
        res.render('secure');
    });
};