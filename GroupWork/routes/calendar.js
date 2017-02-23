var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.get('/', function (request, response) {
	//
	OpStatus.set_status('P0008');

	var callback = function(stt) {
		if (stt == '1') {
			response.render('calendar', { title: 'groupwork.tech', message: 'ようこそ！' });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});

module.exports = router;