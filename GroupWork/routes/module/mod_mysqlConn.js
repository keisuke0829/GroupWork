var mysql = require('mysql');
var conf = require('config');

var dbDef = {
  host: conf.db.host,
  user: conf.db.sys_user,
  password: conf.db.sys_pswd,
  database: conf.db.db
};

var connection = mysql.createConnection(dbDef);

module.exports = connection;