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
	var userName = req.body.userName;
	var email = req.body.email;
	var password = req.body.password;
	var memberExistsQuery = 'SELECT * T101USR WHERE USER_NAME = "' + userName + '" AND PASSWORD = "' + password + '"';

	var registerQuery = 'INSERT INTO T101USR (USER_ID, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")'; // 変更
	conn.query(memberExistsQuery, function(err, email) {
		var memberExists = email.length === 1;
		if (memberExists) {
			res.render('register', {
				title: '新規会員登録',
				memberExists: '既に登録されているメンバーです'
			});
		} else {
			conn.query(registerQuery, function(err, rows) {
				res.redirect('/login');
			});
		}
	});
});

module.exports = router;