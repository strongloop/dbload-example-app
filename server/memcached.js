function domemcached(result, probe, callback) {

  if (probe == 'memcache') { 
    var memcached = require('memcache');
    var memcacheClient = new memcached.Client(11211, 'localhost');
    memcacheClient.connect(); 
    memcacheClient.set( "memcacheKey", 'memcacheValue', function(err, reply){
      console.log("nfecdadbnm")
      if (err) throw err;
      console.log('The ' + probe + ' solution is: ', reply);
      callback(err, reply);
    });
  }

  if (probe == 'memcached') { 
    var memcached = require('memcached');
    var memcacheClient = new memcached('localhost:11211');     // init memcache
    memcacheClient.set( "memcacheKey", {stuff: 'memcacheValue'}, 10000, function(err, reply){
      console.log("nfecdadbnm")
      if (err) throw err;
      console.log('The ' + probe + ' solution is: ', reply);
      callback(err, reply);
    });
  } 
}


function memcachedOperations(res, probe){
  var x = 0;
  x += 1;
  domemcached("OK", probe, function aboutToSendResponse(err, result){
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

module.exports.memcachedOperations = memcachedOperations;
