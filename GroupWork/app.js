var express = require('express');
var bodyParser = require('body-parser');
var socket = require('./routes/module/mod_socket.js');

// express の実態 Application を生成
var app = express();

// POSTのために必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// テンプレートエンジンを EJS に設定
app.set('views', './views');
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));

// ルーティング設定
app.use('/', require('./routes/index.js'));

// サーバーをポート 3000 で起動
app.listen(3000);

// アプリケーション開始ログ
console.log('Server running at http://localhost:3000');