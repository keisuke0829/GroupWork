var express = require('express');
var bodyParser = require('body-parser');
var socket = require('./routes/module/mod_socket.js');

var index = require('./routes/index');
var management = require('./routes/management');
var chatMain = require('./routes/chatMain');
var chatRoom = require('./routes/chatRoom');
var register = require('./routes/register');

// express の実態 Application を生成
var app = express();

app.engine('ejs', require('ejs-locals'));
// POSTのために必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// テンプレートエンジンを EJS に設定
app.set('views', './views');
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));

// ルーティング設定
app.use('/', index);
app.use('/chatMain', chatMain);
app.use('/chatRoom', chatRoom);
app.use('/management', management);
app.use('/register', register);

// サーバーをポート 3000 で起動
app.listen(3000);

// アプリケーション開始ログ
console.log('Server running at https://localhost:3000');
