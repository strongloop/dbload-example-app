var async   = require('async');
var memcache = require('memcache');
var rest = require('restler');


function domemcache(result, callback) {
  var memcacheClient2 = new memcache.Client(11211, 'localhost');
  memcacheClient2.connect();
  memcacheClient2.set( 'stuff', 'memcacheValue', function(err, reply){
    if (err) throw err;
    console.log('The Memcache solution is: ', reply);
    callback(err, reply);
  }, 0);
}


function memcacheOperations(res){
  var x = 0;
  x += 1;
  domemcache("OK", function aboutToSendResponse(err, result){
    var t = parseInt(new Date().getTime()/1000);
    var r = (t%360) * 2*Math.PI/360;

    var now = Date.now();
    while ( (Date.now() - now) < 100 );

    setTimeout(function sendResponse() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World ' + x);
    }, 100);
  });
}

module.exports.memcacheOperations = memcacheOperations; 
