var loopback = require('loopback');
var boot = require('loopback-boot');
var INTERVAL = 1000;
var request = require('request');
var started = new Date();
var path = require('path');
var mysql = require('./mysql');
var mongo = require('./mongodb');
var redis = require('./redis');
var memcache = require('./memcache');
var memcached = require('./memcached');
var sqlite3 = require('./sqlite3');
var oracle = require('./oracle');
var fs = require('fs');
var app = module.exports = loopback();
var PORT = 3001 || process.env.PORT

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // Request Handlers
    app.get('/index.html', function(req, res) {
      fs.readFile('./client/index.html', 'utf8', function (err, html) {
        if (err) { throw err; }       
        res.send(html);
      })
    });

	app.get('/mysql', function(req, res) {
	  mysql.mysqlOperations(res);
	});

	app.get('/mysqlLoop', function(req, res) {
	  res.send("Generating MySQL data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/mysql';
	    callSelf(false, url);
	  },0);
	});

	app.get('/mongo', function(req, res) {
	  mongo.mongoOperations(res);
	});

	app.get('/mongoLoop', function(req, res) {
	  res.send("Generating Mongo data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/mongo';
	    callSelf(false, url);
	  },0);
	});

	app.get('/redis', function(req, res) {
	  redis.redisOperations(res);
	});

	app.get('/redisLoop', function(req, res) {
	  res.send("Generating Redis data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/redis';
	    callSelf(false, url);
	  },0);
	});

	app.get('/memcached', function(req, res) {
	  memcached.memcachedOperations(res, "memcached");
	});

	app.get('/memcachedLoop', function(req, res) {
	  res.send("Generating Memcached data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/memcached';
	    callSelf(false, url);
	  },0);
	});

	app.get('/memcache', function(req, res) {
	  memcached.memcachedOperations(res, "memcache");
	});

	app.get('/memcacheLoop', function(req, res) {
	  res.send("Generating Memcache data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/memcache';
	    callSelf(false, url);
	  },0);
	});


	app.get('/strongoracle', function(req, res) {
	  oracle.oracleOperations(res, 'strong-oracle');
	});

	app.get('/strongoracleLoop', function(req, res) {
	  res.send("Generating Strong Oracle data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/strongoracle';
	    callSelf(false, url);
	  },0);
	});

	app.get('/oracle', function(req, res) {
	  oracle.oracleOperations(res, 'oracle');
	});

	app.get('/oracleLoop', function(req, res) {
	  res.send("Generating Oracle data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/oracle';
	    callSelf(false, url);
	  },0);
	});

	app.get('/oracleDB', function(req, res) {
	  oracle.oracleOperations(res, 'oracledb');
	});

	app.get('/oracleDBLoop', function(req, res) {
	  res.send("Generating OracleDB data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/oracleDB';
	    callSelf(false, url);
	  },0);
	});

	app.get('/sqlite3', function(req, res) {
	  sqlite3.sqlite3Operations(res);
	});

	app.get('/sqlite3Loop', function(req, res) {
	  res.send("Generating Sqlite3 data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/sqlite3';
	    callSelf(false, url);
	  },0);
	});

	app.get('/postgresLoop', function(req, res) {
	  res.send("Generating postgres data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/api/testbooks';
	    callSelf(false, url);
	  },0);
	});

	app.get('/all', function(req, res) {
	  setTimeout(function() {
	    var mysqlurl = 'http://localhost:' + PORT + '/mysql';
	    callSelf(false, mysqlurl);
	    var mongourl = 'http://localhost:' + PORT + '/mongo';
	    callSelf(false, mongourl);
	    var redisurl = 'http://localhost:' + PORT + '/redis';
	    callSelf(false, redisurl);
	    var memcachedurl = 'http://localhost:' + PORT + '/memcached';
	    callSelf(false, memcachedurl);
	    var memcacheurl = 'http://localhost:' + PORT + '/memcache';
	    callSelf(false, memcacheurl);
	    var sqlite3 = 'http://localhost:' + PORT + '/sqlite3';
	    callSelf(false, sqlite3);
	    var postgres = 'http://localhost:' + PORT + '/api/testbooks';
	    callSelf(false, postgres);
	    // var oracleDB = 'http://localhost:' + PORT + '/oracleDB';
	    // callSelf(false, oracleDB);
	    // var oracle = 'http://localhost:' + PORT + '/oracle';
	    // callSelf(false, oracle);
	    // var strongoracle = 'http://localhost:' + PORT + '/strongoracle';
	    // callSelf(false, strongoracle);
	  },0);
	});

	app.get('/allLoop', function(req, res) {
	  res.send("Generating All data");
	  setTimeout(function() {
	    var url = 'http://localhost:' + PORT + '/all';
	    callSelf(false, url);
	  },0);
	});

	app.get('/error', function (req, res, next) {
	  //res.send('hello ' + req.params.name);
	  next(new Error('Forcing a faillure'));
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

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
