var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.post('/', function (request, response) {
	// SELECT * FROM 't000mcl WHERE PAGE_ID = 'P0006';
	OpStatus.set_status('P0006');

	var callback = function(stt) {
		if (stt == '1') {
			response.render('chatRoom', { title: 'Chat Room', message: request.body.enter, userId: request.session.user_id, userName: request.session.user_name });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	//delete opStatus;
	};

	OpStatus.get_status(callback);


});

module.exports = router;
