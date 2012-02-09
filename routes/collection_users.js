module.exports = function(app) {
    
    app.get('/users', function(req, res) {
        dbconnection.collection('users').find().toArray(function(err, items) {
		    if (err) throw err;
		    res.json(items);
    	});
    });  
    
};