[![Build Status](https://travis-ci.org/eHealthAfrica/couchdb-ddoc-test.svg?branch=master)](https://travis-ci.org/eHealthAfrica/couchdb-ddoc-test)

This is a simple CouchDB design doc testing tool.

Usage:

```javascript
var DDocTest = require('couchdb-ddoc-test');
var test = new DDocTest({
  fixture: {a: 1},
  src: 'path/to/map.js'
});
var result = test.runMap();

assert.equals(result, fixture);

```

### available test functions

 CouchDB function                                                                               | available test functions
----------------------------------------------------------------------------------------------  | -----------------------
[mapfun](http://docs.couchdb.org/en/latest/couchapp/ddocs.html#map-functions)(doc)              | `runMap()`  *see note* *
[filterfun](http://docs.couchdb.org/en/latest/couchapp/ddocs.html#filter-functions)(doc, req)   | `runFilter(req)` *see note* *
[listfun](http://docs.couchdb.org/en/latest/couchapp/ddocs.html#list-functions)(head, req)      | `runList(head, req)`
[updatefun](http://docs.couchdb.org/en/latest/couchapp/ddocs.html#update-functions)(doc, req)      | `runUpdate(head, req)`

* the missing `doc` param is obtained from the provided **fixture** and passed internally to the tested function.


### `require()`

CouchDB supports `require()` within design doc functions. It works slightly
different from `require()` in e.g. Node.js (in which these tests are run).
Instead of relying on CouchDB’s `require()` we will be using a couchapp
specific pre-processing directive. To make everything work, we have to
jump through a small hoop:

Say you want to `var foo = require('foo');` within a map function. Do this:

```javascript
function(doc) {
  // prepare for require
  var module = module || {};

  // This next line is a `couchapp` preprocessor line, that copy and pastes the
  // contents of `path/to/foo.js` into this function. It should define the
  // variable `foo`. That is how this code is run within CouchDB.
  // !code path/to/foo.js

  // This next line makes sure that we only run the Node.js `require()` when the
  // `!code` macro is not expanded. This is why !code path/to/foo.js should
  // create the `foo` variable. If it doesn’t exist, we run a regular Node.js
  // `require()`. With *one* caveat: since `map.js` will be run within `eval()`
  // in another module than your tests, we need to put the full module path into
  // `require()`, otherwise, the foo package would have to be a dependency of
  // the couchdb-ddoc-test package, which wouldn’t work out. Anyhoo!
  var foo = foo || require(process.cwd() + '/different/path/to/foo'
}
```

### Test

`npm test`
