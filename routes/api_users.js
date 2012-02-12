module.exports = function(app) {
    
    var users = dbconnection.collection('users');
    
    app.get('/api/users', function(req, res) {
        users.find().toArray(function(err, items) {
    	    if (err) throw err;
		    res.json(items);
    	});
    });
    app.post('/api/users', function(req, res) {
        users.insert({
            name: req.body.name,
        	surname: req.body.surname,
    		age: req.body.age,
            email: req.body.email,
            gender: req.body.gender 
    	}, function() {
    		 res.json({"success": "true"});
    	});
    });
    app.get('/api/users/:id', function(req, res) {
        users.findById(req.params.id, function(err,user) {
            if (err) throw err;
    	    res.json(user);
        });
    });
    app.del('/api/users/:id', function(req, res) {
        users.removeById(req.params.id, function(err) {
            if (err) throw err;
            res.json({"success": "true"});
    	});
    });
    app.put('/api/users/:id', function(req, res) {
        users.updateById(req.body.id, {
        	name: req.body.name,
    		surname: req.body.surname,
    		age: req.body.age,
            email: req.body.email,
            gender: req.body.gender 
    	}, function(err) {
    		 if (err) throw err;
            res.json({"success": "true"});
    	});
    });
     
};