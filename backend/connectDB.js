const mysql = require('mysql2');

// 環境変数から接続情報を取得
const connection = mysql.createConnection({
  host: 'db', // docker-compose.ymlのサービス名
  user: 'root', // docker-compose.ymlのMYSQL_ROOT_PASSWORD
  password: 'root', // docker-compose.ymlのMYSQL_ROOT_PASSWORD
  database: 'mydatabase', // docker-compose.ymlのMYSQL_DATABASE
});

// データベース接続
connection.connect((err) => {
  if (err) {
    console.error('データベース接続エラー:', err);
    return;
  }
  console.log('データベースに接続しました');
});

// 必要に応じてエクスポート
module.exports = connection;