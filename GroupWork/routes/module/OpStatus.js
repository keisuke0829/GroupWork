module.exports = {
	connection: require('./mod_mysqlConn'),
	status: null,
	set_status: function(st) {
		this.status = st;
	},
	get_status: function(callback) {
		var status = this.status;
		var sql = 'SELECT * FROM T000MCL WHERE PAGE_ID = ?';
		this.connection.query(sql ,[status] , function(err, rows, fields) {
			var stt = rows[0].OP_STATUS;
			callback(stt);
		});
	}
};