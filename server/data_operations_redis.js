var app = require("./app");
var async   = require('async');
var redis = require('redis');

//REDIS
var redisClient = redis.createClient();     // init redis
function doRedis(result, callback) {
  // brew install redis && redis-server &
  redisClient.fakeWait = Math.round(Math.random() * 250) + 300;
  redisClient.set( "redisKey", "redisValue", function(err, reply){
    if (err) throw err;
    console.log('The Redis solution is: ', reply);
    callback(err, reply);
    });
}

function chimeraData(res){
  var x = 0;
  x += 1;
  doRedis("OK", function aboutToSendResponse(err, result){
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

module.exports.chimeraData = chimeraData;




