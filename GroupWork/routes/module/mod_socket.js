var http = require('http');

// サーバインスタンス作成
var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	res.end('server connected');
});

var io = require('socket.io').listen(server);

server.listen(8888);// 8888番ポートで起動

var store = {};

// 接続確立時の処理
io.sockets.on('connection', function(socket) {
	// roomに入室する
	socket.on('join', function(data) {
		var dataJson = JSON.parse(data);
		if (dataJson.name !== 'undefined') {
			var _name = dataJson.name;
		}else {
			var _name = 'ゲスト';
		}
		usrObj = {
			'roomId': dataJson.roomId,
			'name': _name,
			'socketId': socket.id
		}
		store[socket.id] = usrObj;
		socket.join(dataJson.roomId);

		var fMsg = store[socket.id].name + 'さんが入室しました！';
		io.to(store[socket.id].roomId).emit('info', JSON.stringify({
			text : fMsg
		}));
	});

	// 「msg」という名前で受信したデータはこの中を通る
	socket.on('msg', function(data) {
		//
		var dataJson = JSON.parse(data);
		dataJson.name = store[socket.id].name;
		io.to(store[socket.id].roomId).emit('receiveMsg', JSON.stringify(dataJson));
	});

	// 退出時
	socket.on('disconnect', function() {
		if (store[socket.id]) {
			var _roomId = store[socket.id].roomId;
			socket.leave(_roomId);
			var fMsg = store[socket.id].name + 'さんが退出しました！';
			io.to(store[socket.id].roomId).emit('info', JSON.stringify({
				text : fMsg
			}));
			delete store[socket.id];
		}

	});
});
