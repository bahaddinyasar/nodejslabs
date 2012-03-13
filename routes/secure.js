module.exports = {
    mapping: {
    	"secure" : {
			"url":"/secure/", 
			"method":"get", 
			"description":"print attributes of twitter user or facebook user",
			"auth":false
		},
        "secureTwitterUser" : {
			"url":"/secure/twitterUser", 
			"method":"get", 
			"description":"print attributes of twitter user",
			"auth":false
		},
        "secureFacebookUser" : {
    		"url":"/secure/facebookUser", 
			"method":"get", 
			"description":"print attributes of facebook user",
			"auth":false
		},
        "secureSession" : {
        	"url":"/secure/session", 
			"method":"get", 
			"description":"print session variables",
			"auth":false
		}        
    },
    
    // GET /secure
    secure: function(req, res) {
        if (req.session.auth.twitter)
            res.redirect('/secure/twitterUser');
        else if (req.session.auth.facebookUser)
            res.redirect('/secure/facebookUser');        
    }, 
    
    // GET /secure/twitterUser
    secureTwitterUser: function(req, res) {
        res.render('twitterUser');
    }, 
    
    // GET /secure/facebookUser
    secureFacebookUser: function(req, res) {
        res.render('facebookUser');
    },  
    
    // GET /secure/session
    secureSession: function(req, res) {
        if(req.query.operation) {
            req.session[req.query.keyInput] = req.query.valueInput;
        }
        res.render('session_vars',{'session':req.session});
    }
};