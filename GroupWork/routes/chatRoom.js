var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');

// デフォルトルーティング

router.post('/', function (request, response, next) {
	// SELECT * FROM 't000mcl WHERE PAGE_ID = 'P0006';
	OpStatus.set_status('P0006');

	var callback = function(stt) {
		if (stt == '1') {
			next();
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	//delete opStatus;
	};

	OpStatus.get_status(callback);

});

router.post('/', function (request, response, next) {
	if (request.body.enterPass !== ''){
		var sql = "SELECT ROOM_ID FROM T102CTR WHERE ROOM_ID = ? AND PASSWORD = ?  LIMIT 1";
		conn.query(sql, [request.body.enter, request.body.enterPass], function(err, rows) {
			var pass = rows.length? rows[0].ROOM_ID: false;
			if (pass == request.body.enter) {
			response.render('chatRoom', { title: 'Chat Room', message: request.body.enter, userId: request.session.user_id, userName: request.session.user_name });
			} else {
				response.redirect('chatMain');
			}
		});
	} else {
		response.render('chatRoom', { title: 'Chat Room', message: request.body.enter, userId: request.session.user_id, userName: request.session.user_name });
	}
});

module.exports = router;
