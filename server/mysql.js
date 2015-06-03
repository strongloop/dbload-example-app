var mysql = require('mysql');

function mysqlConn() {
  var connection = mysql.createConnection({
    host     : 'demo.strongloop.com',
    user     : 'demo',
    password : 'L00pBack',
    database : 'apm'
  });
  return connection;
}

module.exports.mysqlConn = mysqlConn;
