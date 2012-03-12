var	querystring = require('querystring'),
	request = require('request');

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

		//TODO : add include=list to query 
		 var options = {
				"url"	: "https://api.parse.com/1/classes/Pik/" + req.params.pid,
				"headers" : {
					"X-Parse-Application-Id" : config.pikz.parse.id,
					"X-Parse-REST-API-Key" : config.pikz.parse.key
				}
		};
		request.get(options, function (error, response, body){
			if (!error && response.statusCode == 200) {
				var dataAsJson = JSON.parse(body);
				console.dir(dataAsJson);
				res.json({
					"success"	:	"true",
					"imageId"	:	dataAsJson.objectId,					
				    "imageName"	:	dataAsJson.name,
				    "imageUrl"	:	dataAsJson.imageFile.url,
				    "listId"	:	dataAsJson.objectId,
				    "createdAt"	:	dataAsJson.createdAt,
				    "updatedAt"	:	dataAsJson.updatedAt,
				    "location"	:	dataAsJson.location,
				    "gpsLocation": { 
				    	"latitude"	:	dataAsJson.gpsLocation.latitude,
				        "longitude"	:	dataAsJson.gpsLocation.longitude
				    },
				    "reminder"	:	dataAsJson.reminder,
				    "notes"		:	dataAsJson.notes,
				    "dateTaken"	:	dataAsJson.dateTaken
				});
			}
			else {
				res.json({
					"success" : "false",
					"errorMsg" : JSON.parse(body)
				});	
			}
		});
	},
	
	// GET /api/pikz/lists/:lid
	readList : function(req, res) {
		console.log("readList handler is started with the given parameter lid: " + req.params.lid);

		var whereQueryString = JSON.stringify({"list": {"__type": "Pointer", "className": "List", "objectId": req.params.lid}});
		
		var queryString = querystring.stringify({
			"where" : whereQueryString,
			"include" : "list",
			"order" : "dateTaken"
		});
		
		var options = {
				"url"	: "https://api.parse.com/1/classes/Pik?" + queryString,
				"headers" : {
					"X-Parse-Application-Id" : config.pikz.parse.id,
					"X-Parse-REST-API-Key" : config.pikz.parse.key
				}
		};
		
		request.get(options, function (error, response, body){
			if (!error && response.statusCode == 200) {
				var dataAsJsonn = JSON.parse(body);
				console.dir(dataAsJsonn);
				res.json({
					"success"	:	"true",
					"results"	:	dataAsJsonn.results
				});
			}
			else {
				res.json({
					"success" : "false",
					"errorMsg" : JSON.parse(body)
				});	
			}
		});
		
	},
	
	// GET /api/pikz/lists/:lid/photos/:pid
	readPhoto : function(req, res) {
		/*
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
		*/
	}

}
