var assert = require('should'),
    util = require('../util.js');

describe('util.getDirectoryContents()', function() {
    it('should return nonzero items', function() {
        util.getDirectoryContents('..', '', function(files) {
            files.length.should.be.above(0);
            console.log('length: '+files.length);
            done();
        });
    });
});