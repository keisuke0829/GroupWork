var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');

router.get('/', function(req, res, next) {
	OpStatus.set_status('P0009');

	var callback = function(stt) {
		if (stt == '1') {
			res.render('register', { title: 'メンバー登録', message: 'メンバー登録画面です'});
		} else {
			res.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);
});


router.post('/', function(req, res, next) {
	var userName = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var memberExistsQuery = 'SELECT * FROM T101USR WHERE USER_NAME = "' + userName + '" AND PASSWORD = "' + password + '" LIMIT 1';
	var userIdQuery = 'SELECT SEQ FROM T901SEQ WHERE TBL_ID = "T101USR"';

	conn.query(memberExistsQuery, function(err, user) {
		var memberExists = user.length === 1;
		if (memberExists) {
			res.render('register', {
				title: 'メンバー登録',
				message: '既に登録されているメンバーです'
			});
		} else {
			conn.query(userIdQuery, function(err, seq) {
				// USE_IDのシーケンスはDBのトリガーで進める
				var userId = seq[0].SEQ;
				var registerQuery = 'INSERT INTO T101USR (USER_ID, USER_NAME, MAIL_ADDRESS, PASSWORD, INS_DATE, INS_ID) VALUES("' + userId + '", ' + '"' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + 'NOW(), "dbs00")';
				conn.query(registerQuery, function(err, rows) {
					res.render('index', { title: 'groupwork.tech', message: 'メンバー登録完了！' });
				});
			});
		}
	});
});

module.exports = router;