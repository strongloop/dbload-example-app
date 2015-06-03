'use strict';
var random = require("./random");
var chimera = require("./data_operations");
var PORT = 3000;
var INTERVAL = 1000;
var NUM_REQUESTS = 1;

var request = require('request');
var started = new Date();
var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);






// Request Handlers
var index_html = "<!DOCTYPE html> \
              <html>\
              <body> \
              <p> \
              <a href='simple'>Simple</a> Simple data  \
              </p> \
              <p> \
              <a href='random'>Random</a> Random data  \
              </p> \
              <p> \
              <a href='random/once'>Random Once</a> Random data Once \
              </p> \
              <p> \
              <a href='chimera'>Data Operations</a> Chimera \
              </p> \
              <p> \
              <a href='chimera/once'>Data Operations Once</a> Chimera Once\
              </p> \
              </body> \
              </html>";

app.get('/index.html', function(req, res) {
  res.send(index_html);
});

app.get('/error', function (req, res, next) {
  //res.send('hello ' + req.params.name);
  next(new Error('Forcing a faillure'));
});

app.get('/randomData', function(req, res) {
  random.randomData(res);
});

app.get('/chimeraData', function(req, res) {
  chimera.chimeraData(res);
});

app.get('/chimera/once', function(req, res) {
  res.send("Chimera Once");
  setTimeout(function() {
    var url = 'http://localhost:' + PORT + '/chimeraData';
    callSelf(true, url);
  },0);
});

app.get('/chimera', function(req, res) {
  res.send("Chimera infinite");
  setTimeout(function() {
    var url = 'http://localhost:' + PORT + '/chimeraData';
    callSelf(false, url);
  },0);
});

app.get('/random/once', function(req, res) {
  res.send("Generating random data once");
  setTimeout(function() {
    var url = 'http://localhost:' + PORT + '/randomData';
    callSelf(true, url);
  },0);
});

app.get('/random', function(req, res) {
  res.send("Generating random data");
  setTimeout(function() {
    var url = 'http://localhost:' + PORT + '/randomData';
    callSelf(false, url);
  },0);
});

app.get('/simple', function(req, res) {
  res.send("Generating simple data");
  setTimeout(function() {
    var url = 'http://localhost:' + PORT + '/';
    callSelf(true, url);
  },0);
});

function create_request(url){
  var opts = {
    url: url,
    method: 'GET'
  };
  return opts;
}

function callSelf(once, url) {
  var opts = create_request(url);
  request(opts, function(err, res, body) {
    //console.log(body);
    if(once) {
      return;
    }
    else {
      setTimeout(function(){
        callSelf(false, url);
      }, INTERVAL);
    }
  });
}


app.start = function() {
  return app.listen(function() {
    PORT = app.get('port');
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
/*
  var PORT = app.get('port');
  require('http').createServer(app).listen(app.get('port'), app.get('host'),
    function(){
      var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
      if (explorerPath) {
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      } else {
        console.log(
          'Run `npm install loopback-explorer` to enable the LoopBack explorer'
        );
      }
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    }
  );
*/
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
