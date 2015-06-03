var app = require("./app");
var async   = require('async');
var mongodb = require('./mongodb');
var rest = require('restler');

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

function chimeraData(res){
  var x = 0;
  x += 1;
    doMongo(function aboutToSendResponse(err, result){
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








