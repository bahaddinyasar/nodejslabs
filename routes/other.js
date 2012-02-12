module.exports = {
    
    mapping: {
            "ping" : {
    		"url":"/ping", 
			"method":"get", 
			"description":"dummy ping method",
			"auth":false
		}
    },
    ping : function(req, res) {
        res.send('pong');
    }
        
  
   
    
};