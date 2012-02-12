module.exports = function(app) {
    app.post('/api/users',      this._create);
    app.get('/api/users',       this._retrieveAll);
    app.get('/api/users/:id',   this._retrieve);
    app.del('/api/users/:id',   this._delete);
    app.put('/api/users/:id',   this._update);  
};

module.exports._retrieveAll = function(req, res) {
    var users = dbconnection.collection('users');
    users.find().toArray(function(err, items) {
        if (err) throw err;
        res.json(items);
	});
};

module.exports._retrieve = function(req, res) {
    var users = dbconnection.collection('users');
    users.findById(req.params.id, function(err,user) {
        if (err) throw err;
        res.json(user);
    });
};

module.exports._create = function(req, res) {
    var users = dbconnection.collection('users');
    users.insert({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender 
	}, function() {
		 res.json({"success": "true"});
	});
};

module.exports._delete = function(req, res) {
    var users = dbconnection.collection('users');
    users.removeById(req.params.id, function(err) {
        if (err) throw err;
        res.json({"success": "true"});
    });
};

module.exports._update = function(req, res) {
    var users = dbconnection.collection('users');
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
};