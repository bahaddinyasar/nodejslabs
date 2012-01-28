var assert = require('should'),
    util = require('../util.js');

suite('util.getDirectoryContents()', function() {
    test('should return nonzero items', function(done) {
        util.getDirectoryContents('.', '', function(files) {
            files.length.should.be.above(0);
            done();
        });
    });
    test('should return zero items for dummy extension', function(done) {
        util.getDirectoryContents('.', 'asdfasd', function(files) {
            files.length.should.equal(0);
            done(); 
        });
    });
   
});