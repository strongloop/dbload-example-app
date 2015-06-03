var app = require("./app");
var async   = require('async');
var mysql = require('./mysql');


function mysqlOut() {
  var connection = mysql.mysqlConn();
  connection.query('SELECT sleep(2)', function(err, rows, fields) {
    connection.end(); 
  });
}

function cb(x, res){
  var t = parseInt(new Date().getTime()/1000);
  var r = (t%360) * 2*Math.PI/360;
  setTimeout(function sendResponse() {
    res.send('Response time is ' + r + " - " + x);
  }, parseInt(200 + Math.sin(r) * 50));
}

function mysqlIn(x, res) {
  var connection = mysql.mysqlConn();
  connection.query('SELECT sleep(0.3)', function(err, rows, fields) {
    connection.end(function(){
      cb(x, res); 
    });
  });
}

var x = 0;
function randomData(res){
  x += 1;
  var r = Math.random();
  mysqlOut();
  mysqlIn(x, res);
}

module.exports.randomData = randomData;


