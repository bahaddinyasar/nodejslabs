module.exports = {
    mapping: {
    	"login" : {
			"url":"/login", 
			"method":"get", 
			"description":"login page",
			"auth":false
		}
    },

    // GET /login
    login: function(req, res) {
        if (req.session.auth == undefined || !req.session.auth.loggedIn)
            res.render('login');
        else
            res.redirect('/secure/');
    }

}