var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');


// デフォルトルーティング

router.get('/', function (request, response, next) {
	//
	OpStatus.set_status('P0005');

	var callback = function(stt) {
		if (stt == '1') {
			next();
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);
});

router.get('/', function (request, response, next) {
	var sql = "SELECT ROOM_ID, ROOM_NAME, DEL_FLG, DATE_FORMAT(INS_DATE,'%Y/%m/%d %k:%i:%s') AS INS_DATE FROM T102CTR ORDER BY ROOM_ID ASC";
	conn.query(sql, function(err, rows) {
		response.render('chatMain', { title: 'チャットルーム選択', message: 'チャット画面へようこそ！', roomList: rows});
	});
});


//POST
router.post('/', function (request, response, next) {
	var sql = "INSERT INTO T102CTR (ROOM_NAME, PASSWORD, INS_DATE, INS_ID, UPD_DATE, UPD_ID) VALUES(?, ?, NOW(), 'dbs00', NOW(), 'dbs00')";
	if (request.body.password === ''){
		conn.query(sql, [request.body.roomName, null], function(err, rows) {
			next();
		});
	} else {
		conn.query(sql, [request.body.roomName, request.body.password], function(err, rows) {
			next();
		});
	}

});

router.post('/', function (request, response, next) {
	//
	OpStatus.set_status('P0005');

	var callback = function(stt) {
		if (stt == '1') {
			next();
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);
});

router.post('/', function (request, response, next) {
	var sql = "SELECT ROOM_ID, ROOM_NAME, DEL_FLG, DATE_FORMAT(INS_DATE,'%Y/%m/%d %k:%i:%s') AS INS_DATE FROM T102CTR ORDER BY ROOM_ID ASC";
	conn.query(sql, function(err, rows) {
		response.render('chatMain', { title: 'チャットルーム選択', message: 'チャット画面へようこそ！', roomList: rows});
	});
});

module.exports = router;