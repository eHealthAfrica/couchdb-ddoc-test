// TODO: extract into standalone module
var loadFun = require('./load-function');

module.exports = function CouchappEnvironment(options) {
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
    console.log('LOG(couchapp): %s', s);
  }


  return {
    runMap: function() {
      eval(src)(fixture);
      return result;
    },
    result: function() {
      return result;
    }
  }
};
