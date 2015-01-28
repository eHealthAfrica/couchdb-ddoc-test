This is a simple CouchDB design doc testing tool.

Usage:

```javascript
var CouchappTest = require('couchapp-test');
var test = new CouchappTest({
  fixture: {a: 1},
  src: 'path/to/map.js'
});
var result = test.runMap();

assert.equals(result, fixture);

```