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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});