
module.exports.configurePaths = function (app) {
  
  app.get('/session_vars', function (req, res) {
    res.render('session_vars');
  });
  
};