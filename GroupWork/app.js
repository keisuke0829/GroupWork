var express = require('express');
var conf = require('config');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var userSession = require('./routes/module/userSession');
var socket = require('./routes/module/mod_socket.js');

var index = require('./routes/index');
var management = require('./routes/management');
var chatMain = require('./routes/chatMain');
var chatRoom = require('./routes/chatRoom');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var calendar = require('./routes/calendar');

// express の実態 Application を生成
var app = express();

// テンプレートレイアウトのために必要
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
app.use('/', userSession, index);
app.use('/chatMain', userSession, chatMain);
app.use('/chatRoom', userSession, chatRoom);
app.use('/management', userSession, management);
app.use('/register', userSession, register);
app.use('/login', userSession, login);
app.use('/logout', logout);
app.use('/calendar', userSession, calendar);

// サーバーをポート 3000 で起動
app.listen(3000);

// アプリケーション開始ログ
console.log('Server running at https://localhost:3000');
