var app = require("./app");
var async   = require('async');
var mysql = require('./mysql');
var mongodb = require('./mongodb');
var memcached = require('memcached');
var rest = require('restler');

// MySQL
var connection = mysql.mysqlConn();       // init mysql
function doMySQL(result, callback) { // for waterfall
  connection.fakeWait = Math.round(Math.random() * 50) + 50;
  connection.query('SELECT * from loadtest', function(err, rows, fields) {
    if (err) throw err;
    console.log('The MySQL solution is: ', rows);
    callback(err, rows);
  });
}
//

//MONGO DB
// init mongo
var db = mongodb.mongoConn();
var sinCollection;

db.open(function(err, db) {
  db.authenticate('demo', 'L00pBack', function(err, success){
  if(err){
    console.log("Problem with mongo!\n", err);
  }
  else {
    db.collection('dummy-data', function(err, collection) {
      if(err){
        console.log("Problem with mongo!\n", err);
      }
      else {
        sinCollection = collection;
     }
    });
  }
 });
});
 
function doMongo(callback){ // for waterfall
  key = 'dummy';  
  doc = { stuff: 'and things!' };
  doc.key = key;
  
  var wait = Math.round(Math.random() * 100) + 75;
  if (!sinCollection) return setImmediate(callback, new Error('mongo not ready yet'));
  sinCollection.update({ key: key }, doc, { upsert: true, fakeWait: wait }, function(err, result){
    if (err) throw err;
    console.log('The Mongo solution is: ', doc);
    callback(err, doc);
  });
}
//

//MEMCACHE - CLIENT B
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
//

function chooseRandom(list){
  var r = Math.floor(Math.random() * list.length);
  return list[r];
}

function getBliss(result, callback) {
//EXTERNAL - blissfulbeast
  var list1 = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ];
  var list2 = [ 'pride', 'greed', 'lust', 'envy', 'gluttony', 'wrath', 'sloth'];
  var list3 = [ 'Bashful', 'Doc', 'Dopey', 'Grumpy', 'Happy', 'Sleepy', 'Sneezy'];

  var wait =  Math.round(Math.random() * 275) + 100;
  var url = 'http://blissfulbeast.com:3010/'+ chooseRandom(list2) + '/' + wait;
  console.log("URL", url);
  var req = rest.get(url);
  req.on('complete', function(data, res) {
    //console.log("DATA", data);
    //console.log("DATA", res);
    callback(null, result);
  });
}

function chimeraData(res){
  var x = 0;
  x += 1;
  async.waterfall([doMongo, doMySQL, doMemcache2], function aboutToSendResponse(err, result){
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


