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


// should bail if fixture is missing
try {
  var test2 = new CouchappTest({
    src: 'test/fixture/mapjs'
  });
  assert(false); // should not happen
} catch(e) {
  assert.equal(e.message, 'missing options.fixture argument');
}

// should bail if src is missing
try {
  var test2 = new CouchappTest({
    fixture: { a: 1}
  });
  assert(false); // should not happen
} catch(e) {
  assert.equal(e.message, 'missing options.src argument');
}
