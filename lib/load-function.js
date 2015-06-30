// TODO: could be factored into its own module
module.exports = function loadFunction(view_path) {
  return require('fs').readFileSync(view_path, {
    encoding: 'utf-8'
  });
};
