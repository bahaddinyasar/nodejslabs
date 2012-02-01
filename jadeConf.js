
module.exports.configurePaths = function (app) {
  
  app.get('/session_vars/:op?/:key?/:value?', function (req, res) {
    if(req.params.op) {
      req.session[req.params.key] = req.params.value;
    }
    res.render('session_vars',{'session':req.session});
  });
  
};