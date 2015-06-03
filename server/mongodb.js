var mongodb = require('mongodb');

function mongoConn() {
  var dbConnection = new mongodb.Db('apm', new mongodb.Server(
      'demo.strongloop.com', 27017,
      {}), {safe:true} );
  return dbConnection;
}

module.exports.mongoConn = mongoConn;
