var https = require('https');
var querystring = require('querystring');

module.exports = {
	mapping : {
		"readList" : {
			"url" : "/api/pikz/lists/:lid",
			"method" : "get",
			"description" : "get a single list by id",
			"auth" : false
		},
		"readPhoto" : {
			"url" : "/api/pikz/lists/:lid/photos/:pid",
			"method" : "get",
			"description" : "get a single photo by list and photo id",
			"auth" : false
		},
		"readPhotoDirectly" : {
			"url" : "/api/pikz/photos/:pid",
			"method" : "get",
			"description" : "get a single photo directly by photo id",
			"auth" : false
		}

	},

	// GET /api/pikz/photos/:pid
	readPhotoDirectly : function(req, res) {
		console.log("readPhotoDirectly handler is started with the given parameter pid: " + req.params.pid);

		 var options = {
				"host"	: "api.parse.com",
				"port"	: "443",
				"path"	: "/1/classes/Pik/" + req.params.pid,
				"method": 'GET',
				"headers" : {
					"X-Parse-Application-Id" : config.pikz.parse.id,
					"X-Parse-REST-API-Key" : config.pikz.parse.key
				}
		};
		
		https.get(options, function(response) {
			console.log("response is received successfully");

			response.on("data", function(data){
				console.log("data is getted");
				
				var dataAsJson = JSON.parse(""+data);
				
				res.json({
					"success"	:	"true",
					"imageId"	:	dataAsJson.objectId,					
				    "imageName"	:	dataAsJson.name,
				    "imageUrl"	:	dataAsJson.url,
				    "listId"	:	dataAsJson.objectId,
				    "createdAt"	:	dataAsJson.createdAt,
				    "updatedAt"	:	dataAsJson.updatedAt,
				    "location"	:	dataAsJson.location,
				    "gpsLocation": { 
				    	"latitude"	:	dataAsJson.longitude,
				        "longitude"	:	dataAsJson.longitude
				    },
				    "reminder"	:	dataAsJson.reminder,
				    "notes"		:	dataAsJson.notes,
				    "dateTaken"	:	dataAsJson.dateTaken
				});
			});
		}
		).on("error", function(e) {
			console.log("response is not successful...");
			res.json({
				"success" : "false",
				"errorMsg" : e.message
			});
		});
	},

	// GET /api/pikz/lists/:lid
	readList : function(req, res) {
		var whereQueryString = encodeURIComponent('{"list": {"__type": "Pointer", "className": "List", "objectId": "'
				+ req.params.lid + '"}}');
		
		var queryString = querystring.stringify({
			"where" : whereQueryString,
			"include" : "list",
			"order" : "dateTaken"
		});
		
		console.log("sorgu oncesi. query: " + queryString);
		
		https.get({
			//"host" : "api.parse.com",
			//"port" : 443,
			"host" : "127.0.0.1",
			"port" : "8977",
			"path" : "/1/classes/Pik?" + queryString,
			"headers" : {
				"X-Parse-Application-Id" : config.pikz.parse.id,
				"X-Parse-REST-API-Key" : config.pikz.parse.key
			}
		}, function(response) {
			console.dir(response);
			res.json({
				"success" : "true"
			});
		}).on("error", function(e) {
			res.json({
				"success" : "false",
				"errorMsg" : e.message
			});
		});
	},

	// GET /api/pikz/lists/:lid/photos/:pid
	readPhoto : function(req, res) {
		users.findById(req.params.id, function(err, user) {
			if (err) {
				res.json({
					"success" : "false",
					"errorMsg" : err.message
				});
			} else {
				res.json({
					"success" : "true",
					"user" : user
				});
			}
		});
	}

}
