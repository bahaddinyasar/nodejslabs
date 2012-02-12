module.exports = function(app) {
    
// <--------------------------------- DB API FUNCTIONS --------------------------------->    
    app.get('/users', function(req, res) {
        console.log(req.query);
    	dbconnection.collection('users').count(function(err, totalCount) {
    		dbconnection.collection('users').find()
            .skip((req.query.pageNumber - 1) * req.query.pageSize)
            .limit(req.query.pageSize) //for pagination
            .sort([[req.query.sidx, req.query.sord ]]) // req.query.sidx is column name, req.query.sord is 'asc' or 'desc'
            .toArray(function(err, items) {
    			if (err) throw err;
    			var result = {
    				'data': items,
    				'currpage': req.query.pageNumber,
    				'totalpages': Math.ceil(totalCount / req.query.pageSize),
    				'totalrecords': totalCount
    			};
    			res.json(result);
    		});
    	});
    });
    
    app.post('/users', function(req, res) {
        console.log(req.body);
        if (req.body.oper === 'del' ) {
            dbconnection.collection('users').removeById(req.body.id, function(err) {
                console.log('remove error: '+err);
            	res.json({"success": "true"});
        	});
        }
        else if (req.body.oper === 'add'){
        	dbconnection.collection('users').insert({
        		name: req.body.name,
        		surname: req.body.surname,
        		age: req.body.age,
                email: req.body.email,
                gender: req.body.gender
        	}, function() {
        		 res.json({"success": "true"});
        	});
        }
        else if (req.body.oper === 'edit'){
            dbconnection.collection('users').updateById(req.body.id, {
        		name: req.body.name,
        		surname: req.body.surname,
        		age: req.body.age,
                email: req.body.email,
                gender: req.body.gender
        	}, function() {
        		 res.json({"success": "true"});
        	});
        }
    });
// >--------------------------------- DB API FUNCTIONS ---------------------------------<   

};