
var connectData = require('./datasources.json')['oracle'];

connectData['hostname'] = connectData['host']

function doOracle(res, probe, callback){
  if (probe == 'oracle') {
    var oracle = require("oracle");
  } 
  if (probe == 'strong-oracle') {
    connectData['hostname'] = connectData['host']
    var oracle = require("strong-oracle")({});
  }
  if (probe == 'oracledb') {
    connectData['connectString'] = connectData['host'] + "/XE";
    var oracle = require("oracledb");
    oracle.connect = oracle.getConnection;
  }
  

  oracle.connect(connectData, function(err, connection) {
    if (err) { console.log("Error connecting to db:", err); return; }

    connection.execute("SELECT * FROM CUSTOMER WHERE USERNAME=\'foo\'", [], function(err, results) {
        if (err) { console.log("Error executing query:", err); return; }
        console.log("The " + probe + " results are", results);
        if (probe != 'oracledb') { connection.close(); }// call only when query is finished executing
        callback(err, results);
    });
  });
}


function oracleOperations(res, probe){
  var x = 0;
  x += 1;
  doOracle(123, probe, function aboutToSendResponse(err, result){
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

module.exports.oracleOperations = oracleOperations;
