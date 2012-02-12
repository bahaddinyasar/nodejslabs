module.exports = {
    mapping: {
            "code_filename" : {
			"url":"/code/:fileName?", 
			"method":"get", 
			"description":"retrieve source for given file",
			"auth":false
		},
		    "files_fileextension" : {
			"url":"/files/:fileExtension?", 
			"method":"get",
			"description":"retrieves files, filtering for given extension",
			"auth":false
		}
    },
    code_filename : function(req, res) {
        var filepath = req.params.fileName ? __dirname + '/' + req.params.fileName : __filename;
        util.getFileContents(filepath, function(data) {
    		res.send(data);
    	});
    },
    files_fileextension :  function(req, res) {
        util.getDirectoryContents(__dirname,req.params.fileExtension, function(data) {
    		res.json(data);
    	});
    }
}
    
    