var assert = require('should'),
    util = require('../util.js');

describe('util.getDirectoryContents()', function() {
    it('should return nonzero items', function(done) {
        util.getDirectoryContents('.', '', function(files) {
            files.length.should.be.above(0);
            done();
        });
    });
    it('should return zero items for dummy extension', function(done) {
        util.getDirectoryContents('.', 'asdfasd', function(files) {
            files.length.should.be.above(0);
            done();
        });
    });
   
});