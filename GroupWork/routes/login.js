var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');

router.get('/', function(req, res, next) {
	OpStatus.set_status('P0003');

	var callback = function(stt) {
		if (stt == '1') {
			next();
		} else {
			res.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);
});

router.get('/', function(req, res, next) {
	if (req.session.user_id) {
		res.redirect('index');
	} else {
		res.render('login', {
			title: 'ログイン',
			message: 'ログイン画面です'
		});
	}
});

router.post('/', function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;
	var query = 'SELECT USER_ID, USER_NAME FROM T101USR WHERE USER_NAME = "' + userName + '" AND PASSWORD = "' + password + '" LIMIT 1';
	conn.query(query, function(err, rows) {
		var userName = rows.length? rows[0].USER_NAME: false;
		var userId = rows.length? rows[0].USER_ID: false;
		if (userName) {
			req.session.user_id = userId;
			req.session.user_name = userName;
			res.redirect('index');
		} else {
			res.render('login', {
				title: 'ログイン',
				message: 'ログイン画面です',
				noUser: '名前とパスワードが一致するユーザーがいません'
			});
		}
	});
});

module.exports = router;