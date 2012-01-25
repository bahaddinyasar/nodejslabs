var fs = require('fs');

console.log(__filename);

fs.readFile(__filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});