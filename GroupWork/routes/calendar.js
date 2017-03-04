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
			var ymDate = yy + ('0' + mm).slice(-2) + '%'
			var query = "SELECT A.SCH_DATE ,B.USER_NAME ,A.WG_FLG ,A.KARI_FLG ,A.SCH_KBN, A.COMMENT FROM T104SCH A"
			query = query + " JOIN T101USR B ON A.USER_ID = B.USER_ID WHERE SCH_DATE LIKE '" + ymDate + "'";
			conn.query(query, function(err, rows) {
				response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
					year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm, schList: rows });
			});
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
			var ymDate = yy + ('0' + mm).slice(-2) + '%'
			var query = "SELECT A.SCH_DATE ,B.USER_NAME ,A.WG_FLG ,A.KARI_FLG ,A.SCH_KBN, A.COMMENT FROM T104SCH A"
			query = query + " JOIN T101USR B ON A.USER_ID = B.USER_ID WHERE SCH_DATE LIKE '" + ymDate + "'";
			conn.query(query, function(err, rows) {
				response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
					year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm, schList: rows });
			});
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
				var kariFlg = "0";
				if (request.body.CB_kari == "1") {
					kariFlg = "1"
				}
				var delFlg = "0";
				if (request.body.CB_del == "1") {
					delFlg = "1"
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
				var mmm = ('0' + mm).slice(-2);
				var ddd = ('0' + dd).slice(-2);
				var queryDate = '' + yy + mmm + ddd;
				var ymDate = yy + ('0' + mm).slice(-2) + '%'
				query = "SELECT A.SCH_DATE ,B.USER_NAME ,A.WG_FLG ,A.KARI_FLG ,A.SCH_KBN, A.COMMENT FROM T104SCH A"
				query = query + " JOIN T101USR B ON A.USER_ID = B.USER_ID WHERE SCH_DATE LIKE '" + ymDate + "'";
				// すでにデータがあるか確認
				var query = 'SELECT SCH_DATE FROM T104SCH WHERE SCH_DATE = "' + queryDate + '" AND WG_FLG = "1" LIMIT 1';
				conn.query(query, function(err, rows) {
					var schDate = rows.length? rows[0].SCH_DATE: false;
					if (schDate && delFlg == '1') {
						var sql = "DELETE FROM T104SCH WHERE SCH_DATE = ? AND WG_FLG = '1'"
						conn.query(sql, [queryDate], function(err, rows) {
							conn.query(query, function(err, rows) {
								response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
									year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm, schList: rows });
							});
						});
					} else if (schDate) {
						var sql = "UPDATE T104SCH SET USER_ID = ? ,KARI_FLG = ? ,COMMENT = ? ,INS_DATE = NOW() ,INS_ID = ? WHERE SCH_DATE = ? AND WG_FLG = '1'";
						conn.query(sql, [request.session.user_id ,kariFlg ,request.body.comment ,request.session.user_id ,queryDate], function(err, rows) {
							conn.query(query, function(err, rows) {
								response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
									year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm, schList: rows });
							});
						});
					} else if (delFlg == '1') {
						response.render('maintenance', { title: 'groupwork.tech', message: '日程が存在しないよ' });
					} else {
						var sql = "INSERT INTO T104SCH (SCH_DATE, USER_ID, WG_FLG, KARI_FLG, SCH_KBN, COMMENT, INS_DATE, INS_ID) VALUES(? ,? ,'1' ,? ,null ,? ,NOW() , ?)";
						conn.query(sql, [queryDate ,request.session.user_id ,kariFlg ,request.body.comment ,request.session.user_id], function(err, rows) {
							conn.query(query, function(err, rows) {
								response.render('calendar', { title: 'groupwork.tech', message: 'WG用カレンダー',
									year: yy, month: mm, nextYear: nextyy, preYear: preyy, nextMonth: nextmm, preMonth: premm, schList: rows });
							});
						});
					}
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