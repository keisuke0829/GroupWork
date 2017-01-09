var express = require('express');
var conf = require('config');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var socket = require('./routes/module/mod_socket.js');

var index = require('./routes/index');
var management = require('./routes/management');
var chatMain = require('./routes/chatMain');
var chatRoom = require('./routes/chatRoom');
var register = require('./routes/register');
var login = require('./routes/login');

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

//faviconを設定
app.use(favicon('public/images/favicon.ico'));

// セッションの設定
app.use(session({
	  secret: conf.session.key,
	  resave: false,
	  saveUninitialized: true
}));

// ルーティング設定
app.use('/', index);
app.use('/chatMain', chatMain);
app.use('/chatRoom', chatRoom);
app.use('/management', management);
app.use('/register', register);
app.use('/login', login);

// サーバーをポート 3000 で起動
app.listen(3000);

// アプリケーション開始ログ
console.log('Server running at https://localhost:3000');
