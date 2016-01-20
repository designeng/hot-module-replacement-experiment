var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var port = process.env.PORT || 8080;
app.set('port', port);

// static pages
app.use(express.static('./public'));

var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config');
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler, {log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000}));

/* 404 */
app.use(function(req, res, next) {
    var err = new Error('Url is not found! ::: ' + req.url);
    err.status = 404;
    next(err);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

module.exports = app;