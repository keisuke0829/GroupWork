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
	var userName = req.body.user_name;
	var email = req.body.email;
	var password = req.body.password;
	var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	var query = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")';
	connection.query(query, function(err, rows) {
		res.redirect('/login');
	});
});

module.exports = router;