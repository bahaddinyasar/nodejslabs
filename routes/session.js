module.exports = function (app) {
  
  app.get('/session_vars', function (req, res) {
    if(req.query.operation) {
      req.session[req.query.keyInput] = req.query.valueInput;
    }
    res.render('session_vars',{'session':req.session});
  });
  
};