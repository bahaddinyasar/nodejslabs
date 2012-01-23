var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(req);
  res.end('Hello nodejslabs!!!\n');
}).listen(process.env.PORT, "0.0.0.0");
console.log('Server running at http://localhost:80/');