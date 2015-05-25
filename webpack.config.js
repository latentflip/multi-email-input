var getConfig = require('hjs-webpack')

module.exports = getConfig({
  isDev: true,
  in: 'demo.js',
  out: 'build'
});
