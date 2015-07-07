var loadFun = require('./load-function');

module.exports = function DDocTest(options) {
  options = options || {};

  if (!options.fixture) {
    throw new Error('missing options.fixture argument');
  }

  if (!options.src) {
    throw new Error('missing options.src argument');
  }

  var src = loadFun(options.src);
  var fixture = options.fixture;
  var result = [];

  var emit = function(k, v) {
    result.push({key: k, value: v});
  };

  var log = function(s) {
    console.log('LOG(couchadb-test): %s', s);
  };

  var getRow = function() {
    if (fixture.length > 0) {
      return fixture.shift();
    } else {
      return null;
    }
  };

  var start = function() {
    // noop for now
  };

  var send = function(value) {
    result.push(value);
  };

  return {
    runMap: function() {
      /* jshint evil: true */
      // TODO: See if we can use new Function()
      eval(src)(fixture);
      return result;
    },
    runList: function(head, req) {
      /* jshint evil: true */
      // TODO: See if we can use new Function()
      eval(src)(head, req);
      return result.join('');
    },
    runFilter: function(req) {
      /* jshint evil: true */
      // TODO: See if we can use new Function()
      return eval(src)(fixture, req);
    },
    result: function() {
      return result;
    }
  };
};
