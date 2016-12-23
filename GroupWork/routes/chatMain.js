var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.get('/', function (request, response) {
	//
	OpStatus.set_status('P0005');

	var callback = function(stt) {
		if (stt == '1') {
			response.render('chatMain', { title: 'チャットルーム選択', message: 'チャット画面へようこそ！' });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});

module.exports = router;