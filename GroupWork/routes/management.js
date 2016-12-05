var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');


// デフォルトルーティング

router.get('/management', function (request, response, next) {
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

router.get('/management', function (request, response, next) {
	var sql = 'SELECT PAGE_ID, PAGE_GROUP, OP_STATUS FROM T000MCL ORDER BY PAGE_ID ASC';
	conn.query(sql, function(err, rows) {
		response.render('management', { title: '管理ページ', message: 'メンテナンス画面へようこそ！', pageList: rows});
	});

});

module.exports = router;