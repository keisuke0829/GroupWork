var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.get('/management', function (request, response) {
	//
	OpStatus.set_status('P9002');

	var callback = function(stt) {
		if (stt == '1') {
			response.render('management', { title: '管理ページ', message: 'メンテナンス画面へようこそ！' });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	//delete opStatus;
	};

	OpStatus.get_status(callback);

});

module.exports = router;