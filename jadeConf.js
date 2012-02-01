
module.exports.configurePaths = function (app) {
  
  app.get('/session_vars', function (req, res) {
    if(req.query.op) {
      req.session[req.query.key] = req.query.value;
    }
    res.render('session_vars',{'session':req.session});
  });
  
};