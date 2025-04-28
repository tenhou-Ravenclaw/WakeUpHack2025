const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;
// CORS設定（すべてのオリジンからのアクセスを許可）
app.use(cors({
    origin: '*', // '*' で全てのオリジンからアクセスを許可
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample API endpoint
app.get('/api', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.get('/test', (req, res) => {
    const { needHumanNum } = require('./algorythm/needHumanNum');
    const result = needHumanNum(); // 必要な人員数を取得
    res.json({ requiredWorkers: result }); // JSON形式でレスポンスを返す
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});