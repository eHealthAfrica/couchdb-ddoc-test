// TODO: stolen from ebola-call-center-search, should be factored into its own module
module.exports = function loadFunction(view_path) {
  var c = require('fs').readFileSync(view_path, {
    encoding: 'utf-8'
  });
  return '('+c+')';
};
