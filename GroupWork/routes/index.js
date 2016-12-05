var express = require('express');
var router = express.Router();
var OpStatus = require('./module/OpStatus');


// デフォルトルーティング

router.get('/', function (request, response) {
	//
	OpStatus.set_status('P0001');

	var callback = function(stt) {
		if (stt == '1') {
			response.render('index', { title: 'groupwork.tech', message: 'ようこそ！' });
		} else {
			response.render('maintenance', { title: 'groupwork.tech', message: 'このページはメンテナンス中です' });
		}
	};

	OpStatus.get_status(callback);


});


//router.get('/chatRoom', function (request, response) {
//	response.render('chatRoom', { title: 'Chat Room', message: 'チャットルームへようこそ！' });
	/*
	if (request.body.checkFlg == 'false') {
		response.render('missBoard', { title: 'Sample Node.js', message: '駒の数か位置がおかしいぞ！!', img: request.body.image.split(",") });
	} else {
		response.render('game', { title: 'Sample Node.js', message: 'New game!', img: request.body.image.split(",") });
	}*/
	//next();
//});

/*
router.post('/game', function (request, response) {
	console.log("駒チェックsoto");
	console.log(request.body.checkFlg);
	if (request.body.checkFlg == 'false') {
		console.log("駒チェック");
		response.render('index', { title: 'Sample Node.js', message: '駒の数がおかしいぞ！!', img: request.body.image.split(",") });
	}
});
*/

module.exports = router;