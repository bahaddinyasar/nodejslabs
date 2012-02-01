
module.exports.configurePaths = function (app) {
  
  app.get('/session_vars', function (req, res) {
    if(req.body.op) {
      req.session[req.body.key] = req.body.value;
    }
    res.render('session_vars',{'session':req.session});
  });
  
};