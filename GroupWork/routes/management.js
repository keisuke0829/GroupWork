var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');


// デフォルトルーティング
router.get('/', function (request, response, next) {
	//
	OpStatus.set_status('P9002');

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
	var sql = 'SELECT PAGE_ID, PAGE_GROUP, PAGE_NAME, OP_STATUS FROM T000MCL ORDER BY PAGE_ID ASC';
	conn.query(sql, function(err, rows) {
		response.render('management', { title: '管理ページ', message: 'メンテナンス画面へようこそ！', pageList: rows});
	});
});

// POST
router.post('/', function (request, response, next) {
	var sql = "UPDATE T000MCL SET OP_STATUS = ?, UPD_DATE = NOW(), UPD_ID = 'dbs00' WHERE PAGE_ID = ?";
	if ((request.body.page_id).substr(6,1) == 0){
		conn.query(sql, ['1', (request.body.page_id).substr(0,5)], function(err, rows) {
			next();
		});
	} else {
		conn.query(sql, ['0', (request.body.page_id).substr(0,5)], function(err, rows) {
			next();
		});
	}

});

router.post('/', function (request, response, next) {
	//
	OpStatus.set_status('P9002');

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
	var sql = 'SELECT PAGE_ID, PAGE_GROUP, PAGE_NAME, OP_STATUS FROM T000MCL ORDER BY PAGE_ID ASC';
	conn.query(sql, function(err, rows) {
		response.render('management', { title: '管理ページ', message: 'メンテナンス画面へようこそ！', pageList: rows});
	});
});

module.exports = router;