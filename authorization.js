module.exports = function(app) {
  
    app.get('/secure*', function(req, res, next) {
        console.dir(req.session);
        next();
    });
};