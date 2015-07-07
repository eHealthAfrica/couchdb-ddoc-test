var assert = require('assert');
var DDocTest = require('../lib/couchdb-ddoc-test');
var test = new DDocTest({
  fixture: {a: 1},
  src: 'test/fixtures/map.js'
});
var result = test.runMap();

assert.deepEqual(result, [{
  key: null,
  value: {a: 1}
}]);

// filter test
var test = new DDocTest({
  fixture: {a: 1},
  src: 'test/fixtures/filter.js'
});
var result = test.runFilter();
assert.equal(result, true);

// filter test passing request
var test = new DDocTest({
  fixture: {a: 1},
  src: 'test/fixtures/filter_with_request.js'
});
var result = test.runFilter({ param: "param"});
assert.equal(result, true);

// should bail if fixture is missing
try {
  var test2 = new DDocTest({
    src: 'test/fixture/mapjs'
  });
  assert(false); // should not happen
} catch(e) {
  assert.equal(e.message, 'missing options.fixture argument');
}

// should bail if src is missing
try {
  var test2 = new DDocTest({
    fixture: { a: 1}
  });
  assert(false); // should not happen
} catch(e) {
  assert.equal(e.message, 'missing options.src argument');
}
