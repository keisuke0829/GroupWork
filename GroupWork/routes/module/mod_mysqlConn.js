var mysql = require('mysql');
var conf = require('config');

var dbDef = {
  host: config.db.host,
  user: config.db.sys_user,
  password: config.db.sys_pswd,
  database: config.db.db
};

var connection = mysql.createConnection(dbDef);

module.exports = connection;