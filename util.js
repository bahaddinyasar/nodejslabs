var fs = require('fs');

module.exports.getFileContents = function(filepath,callback) {
	fs.readFile(filepath, 'utf8', function(err, data) {
		if (err) {
			console.log('getFileContents error: '+err);
		}
		callback(data);
	});
};
module.exports.getDirectoryContents = function(dirpath, fileExtension, callback) {
	fs.readdir(dirpath, function(err, data) {
		if (err) {
			console.log('getDirectoryContents error: ' + err);
		}
		var filteredArray = data.filter(function(item) {
			return fileExtension ? item.match(new RegExp('\.' + fileExtension + '$')) : true;
		});
		callback(filteredArray);
	});
};

module.exports.requireCodeForApp = function(dirpath, app) {
    var files = fs.readdirSync(dirpath);
    if(files) {
        files.forEach(function(file){
            if( (/\.js$/).test(file) ) 
                require(dirpath+'/'+file)(app);
        });
    }
};
var mappingString = "";

module.exports.requireRoutes = function(app) {
    var files = fs.readdirSync(__dirname+'/routes');
    if(files) {
        files.forEach(function(file){
            if( (/\.js$/).test(file) ) 
                bootController(app,file);
        });
    }
    app.get("/api", function(req, res){
            res.send(mappingString);
        });
};

function add_to_mapping_string(method, url, description, auth) {
    mappingString += "<div style='width: 400px; height: 20px; padding: 5px; background-color: #ccc; color: #000; font-family: Arial, Verdana, sans-serif'><b>" + method + " " + url + "</b></div><div style='width: 400px; padding: 5px; background-color: #eee; color: #000; font-family: Arial, Verdana, sans-serif'>" + description + "<br /><b>Auth:</b> " + auth + "</div><br />";
}

function bootController(app, file) {
  var name = file.replace('.js', '');
  var actions = require(__dirname+'/routes/' + name);

  var mapping = actions["mapping"];

  Object.keys(actions).map(function(action){
	  var fn = actions[action];

	  if(typeof(fn) === "function") {
		  if(a = mapping[action]) {
            add_to_mapping_string(a.method, a.url, a.description, a.auth);
		  	switch(a.method) {
		  		case 'get':
		  					app.get(a.url, fn);
		  					console.log("initialized get " + a.url);
		  					break;
		  		case 'post':
		  					app.post(a.url, fn);
		  					console.log("initialized post " + a.url);
		  					break;
		  		case 'put':
		  					app.put(a.url, fn);
		  					console.log("initialized put " + a.url);
		  					break;
		  		case 'delete':
		  					app.del(a.url, fn);
		  					console.log("initialized delete " + a.url);
		  					break;
		  	}
		  } else {
		  	console.log("WARNING: no mapping for " + action + " defined");
		  }
	}
 });
}


  
