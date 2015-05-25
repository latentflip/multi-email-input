var getConfig = require('hjs-webpack')

var config = getConfig({
  isDev: true,
  in: 'demo.js',
  out: 'build',
});

config.devServer.port = 8082

module.exports = config;
