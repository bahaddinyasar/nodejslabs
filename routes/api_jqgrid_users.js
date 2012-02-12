var api_users = require(__dirname+'/api_users');

module.exports = {
    mapping: {
    	"apiJqgridUsersGet" : {
			"url":"/api/jqgrid/users", 
			"method":"get", 
			"description":"retrieve all users",
			"auth":false
		},
        "apiJqgridUsersPost" : {
			"url":"/api/jqgrid/users", 
			"method":"post", 
			"description":"retrieve all users",
			"auth":false
		},
        
        
    },
    
    // GET /users
    apiJqgridUsersGet: function(req, res) {
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
    }, 
  
    // POST /users
    apiJqgridUsersPost: function(req, res) {
        console.log(req.body);
        if (req.body.oper === 'del' ) {
            api_users.delete(req, res);
        }
        else if (req.body.oper === 'add'){
        	api_users.create(req, res);
        }
        else if (req.body.oper === 'edit'){
            api_users.update(req, res);
        }
    }
}