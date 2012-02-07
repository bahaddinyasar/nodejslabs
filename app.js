var app = require('express').createServer(),
    io = require('socket.io').listen(app);

// to make util global, omit var. 
util = require('./util.js');

require('./configuration.js').boot(app); 
require('./authorization.js')(app); 

util.requireCodeForApp(__dirname+'/routes',app); 

require('./chat.js')(io);

app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);