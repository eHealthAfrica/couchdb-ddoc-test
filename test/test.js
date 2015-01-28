var assert = require('assert');
var CouchappTest = require('../lib/couchapp-test');
var test = new CouchappTest({
  fixture: {a: 1},
  src: 'test/fixtures/map.js'
});
var result = test.runMap();

assert.deepEqual(result, [{
  key: null,
  value: {a: 1}
}]);
