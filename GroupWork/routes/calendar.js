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
			var yy = date.getFullYear();
			date.setMonth(date.getMonth() + 1);
			var nextyy = date.getFullYear();
			var nextmm = date.getMonth() + 1;
			date.setMonth(date.getMonth() - 2);
			var preyy = date.getFullYear();
			var premm = date.getMonth() + 1;
			response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
				year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});

router.post('/changeMonth', function (request, response) {
	//
	OpStatus.set_status('P0008');

	var callback = function(stt) {
		if (stt == '1') {
			var mm = request.body.month;
			var yy = request.body.year;
			var date = new Date();
			date.setFullYear(yy);
			date.setMonth(mm - 1);
			date.setMonth(date.getMonth() + 1);
			var nextyy = date.getFullYear();
			var nextmm = date.getMonth() + 1;
			date.setMonth(date.getMonth() - 2);
			var preyy = date.getFullYear();
			var premm = date.getMonth() + 1;
			response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
				year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);

});


module.exports = router;