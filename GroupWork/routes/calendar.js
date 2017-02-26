var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.get('/', function (request, response) {
	//
	OpStatus.set_status('P0008');

	var callback = function(stt) {
		if (stt == '1') {
			var date = new Date();
			var mm = date.getMonth() + 1;
			var nextmm = date.getMonth() + 2;
			var premm = date.getMonth() + 0;
			response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー', month: mm, nextMonth: nextmm, preMonth: premm });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});

router.post('/pre', function (request, response) {
	//
	OpStatus.set_status('P0008');

	var callback = function(stt) {
		if (stt == '1') {
			var mm = request.body.preMonth;
			var date = new Date();
			date.setMonth(mm);
			var nextmm = date.getMonth() + 2;
			var premm = date.getMonth() + 0;
			response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー', month: mm, nextMonth: nextmm, preMonth: premm });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);

});

router.post('/next', function (request, response) {
	//
	OpStatus.set_status('P0008');

	var callback = function(stt) {
		if (stt == '1') {
			var mm = request.body.nextMonth;
			var date = new Date();
			date.setMonth(mm);
			var nextmm = date.getMonth() + 2;
			var premm = date.getMonth() + 0;
			response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー', month: mm, nextMonth: nextmm, preMonth: premm });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});

module.exports = router;