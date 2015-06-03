var app = require("./app");
var async   = require('async');
var memcache = require('memcache');
var memcached = require('memcached');
var rest = require('restler');

var memcacheClient2 = new memcached('localhost:11211');     // init memcache
function doMemcache2(result, callback) {
  // brew install memcached && /usr/local/bin/memcached -d -p 11211
  memcacheClient2.fakeWait = Math.round(Math.random() * 250) + 300;
  memcacheClient2.set( "memcacheKey", {stuff: 'memcacheValue'}, 10000, function(err, result){
    if (err) throw err;
    console.log('The Memcached solution is: ', result);
    callback(err, result);
  });
}

function chimeraData(res){
  var x = 0;
  x += 1;
  async.waterfall([doMemcache2], function aboutToSendResponse(err, result){
    var t = parseInt(new Date().getTime()/1000);
    var r = (t%360) * 2*Math.PI/360;

    var now = Date.now();
    while ( (Date.now() - now) < 100 );

    setTimeout(function sendResponse() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World ' + x);
//    }, parseInt(200 + Math.sin(r) * 50));
    }, 100);
  });
}

