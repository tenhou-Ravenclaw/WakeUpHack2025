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

const { 
    registerJobSercher, 
    registerReport, 
    agreeWorkBuildByNPOTregger, 
    deleteJobSercherTrigger, 
    wantHomeJobSearcherTrigger,
} = require('./trigger/triggerByNPO');

const { 
    onPropertyRegistered, 
    WorkBuildByOwnerTrigger, 
    deleteBuildTrigger, 
    onPurchaseApprovedTrigger,
    signUpTrigger,
    loginTrigger,
} = require('./trigger/triggerByOwner');

// 被修飾希望者の登録
app.post('/trigger/register-job-searcher', (req, res) => {
    const { name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId } = req.body;
    try {
        registerJobSercher(name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId);
        res.status(200).json({ message: 'Job searcher registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register job searcher' });
    }
});

// レポートの登録
app.post('/trigger/register-report', (req, res) => {
    const { buildId, image } = req.body;
    try {
        registerReport(buildId, image);
        res.status(200).json({ message: 'Report registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register report' });
    }
});

// 働く担当者の確定
app.post('/trigger/agree-work', (req, res) => {
    const { jobSercherId, buildIds } = req.body;
    try {
        agreeWorkBuildByNPOTregger(jobSercherId, buildIds);
        res.status(200).json({ message: 'Work agreement confirmed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to confirm work agreement' });
    }
});

// ホームレスの削除
app.delete('/trigger/delete-job-searcher', (req, res) => {
    const { workJobSercherId } = req.body;
    try {
        deleteJobSercherTrigger(workJobSercherId);
        res.status(200).json({ message: 'Job searcher deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete job searcher' });
    }
});

// 購入希望が出た際の処理
app.post('/trigger/want-home', (req, res) => {
    const { jobSercherId, buildId } = req.body;
    try {
        wantHomeJobSearcherTrigger(jobSercherId, buildId);
        res.status(200).json({ message: 'Home purchase request processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process home purchase request' });
    }
});

// 物件が登録された際の処理
app.post('/trigger/property-registered', (req, res) => {
    const { ownerId, location, roomSize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention, assignedJobSearcherId, deleteFlag } = req.body;
    try {
        onPropertyRegistered(ownerId, location, roomSize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention, assignedJobSearcherId, deleteFlag);
        res.status(200).json({ message: 'Property registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register property' });
    }
});

// 働く人に問題がないかを送ってもらったトリガー
app.post('/trigger/work-build', (req, res) => {
    const { buildId, jobSercherIds } = req.body;
    try {
        WorkBuildByOwnerTrigger(buildId, jobSercherIds);
        res.status(200).json({ message: 'Work build processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process work build' });
    }
});

// 家が売れたなどで物件を消すトリガー
app.delete('/trigger/delete-build', (req, res) => {
    const { buildId } = req.body;
    try {
        deleteBuildTrigger(buildId);
        res.status(200).json({ message: 'Build deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete build' });
    }
});

// 家の購入許可が出たトリガー
app.post('/trigger/purchase-approved', (req, res) => {
    const { buildId, jobSercherId } = req.body;
    try {
        onPurchaseApprovedTrigger(buildId, jobSercherId);
        res.status(200).json({ message: 'Purchase approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to approve purchase' });
    }
});

// サインアップ用のトリガー
app.post('/trigger/sign-up', async (req, res) => {
    console.log('サインアップ');
    const { name, birthday, payWay, pwd, mailAddress } = req.body;
    try {
        await signUpTrigger(name, birthday, payWay, pwd, mailAddress);
        res.status(200).json({ message: 'Sign up processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process sign up' });
    }
});
// ログイン用のトリガー
app.post('/trigger/login', async (req, res) => {
    console.log('ログイン');
    const { email, password } = req.body;
    try {
        await loginTrigger(email, password);
        res.status(200).json({ message: 'Login processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process login' });
    }
});