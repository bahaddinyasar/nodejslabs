var users = dbconnection.collection('users');

module.exports = {
    mapping: {
		"index" : {
			"url":"/api/users", 
			"method":"get", 
			"description":"retrieve all users",
			"auth":false
		},
		"create" : {
			"url":"/api/users", 
			"method":"put",
			"description":"create a new user",
			"auth":false
		},
		"read" : {
			"url":"/api/users/:id", 
			"method":"get",
			"description":"get a single user by id",
			"auth":false
		},
		"update" : {
			"url":"/api/users/:id", 
			"method":"post",
			"description":"update a given user",
			"auth":false
		},
		"delete" : {
			"url":"/api/users/:id", 
			"method":"_delete",
			"description":"delete your own user, attention: cant be undone",
			"auth":true
		}
	},

    // GET /users
	index: function(req, res) {
        users.find().toArray(function(err, items) {
            if (err) throw err;
            res.json(items);
        });
	}, 

    // GET /users/:id
	read: function(req, res) {
        users.findById(req.params.id, function(err,user) {
            if (err){
                res.json({"success": "false",   "errorMsg"  : err.message});
			} else {
                res.json({"success": "true",    "user"      : user});
			}
        });
	}, 
    
    // POST /users
	update: function(req, res) {        
        users.updateById(req.body.id, {
            name: req.body.name,
        	surname: req.body.surname,
    		age: req.body.age,
            email: req.body.email,
            gender: req.body.gender 
    	}, function(err) {
    		if (err)  {
    			res.json({"success": "false", "errorMsg" : err.message});
			} else {
                res.json({"success": "true"});
			}
    	});
	}, 
    
    // PUT /users
	create: function(req, res) {
        users.insert({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender 
        }, function(err) {
        	if (err)  {
    			res.json({"success": "false", "errorMsg" : err.message});
			} else {
                res.json({"success": "true"});
			}
    	});
	}, 
    
    // DELETE /users/:id
	_delete: function(req, res) {
	    var users = dbconnection.collection('users');
        users.removeById(req.params.id, function(err) {
            if (err)  {
    			res.json({"success": "false", "errorMsg" : err.message});
			} else {
                res.json({"success": "true"});
			}
    	});
	}
}
