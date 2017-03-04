var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');
var conn = require('./module/mod_mysqlConn');


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


//メンバー予定登録
router.post('/wgSubmit', function (request, response) {
	// セッション有無確認
	if (!request.session.user_id) {
		response.render('maintenance', { title: 'groupwork.tech', message: 'ログインしてから日程登録してください' });
	} else {
		OpStatus.set_status('P0008');

		var callback = function(stt) {
			if (stt == '1') {
				var sql = "INSERT INTO T104SCH (SCH_DATE, USER_ID, WG_FLG, KARI_FLG, SCH_KBN, COMMENT, INS_DATE, INS_ID) VALUES(? ,? ,'1' ,? ,null ,? ,NOW() , ?)";
				var kariFlg = "0";
				if (request.body.CB_kari == "1") {
					kariFlg = "1"
				}
				// カレンダー用
				var mm = request.body.month;
				var yy = request.body.year;
				var dd = request.body.day;
				var date = new Date();
				date.setFullYear(yy);
				date.setMonth(mm - 1);
				date.setMonth(date.getMonth() + 1);
				var nextyy = date.getFullYear();
				var nextmm = date.getMonth() + 1;
				date.setMonth(date.getMonth() - 2);
				var preyy = date.getFullYear();
				var premm = date.getMonth() + 1;
				// クエリ用
				mm = ('0' + mm).slice(-2);
				dd = ('0' + dd).slice(-2);
				var queryDate = '' + yy + mm + dd;
				conn.query(sql, [queryDate ,request.session.user_id ,kariFlg ,request.body.comment ,request.session.user_id], function(err, rows) {
					response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
						year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm });
				});
			} else {
				response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
			}
		};

		OpStatus.get_status(callback);
	}

});

// 活動日登録

module.exports = router;