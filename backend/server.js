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
app.post('/trigger/register-job-searcher', async (req, res) => {
    const { name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId } = req.body;
    try {
        await registerJobSercher({ name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId });
        res.status(200).json({ message: 'Job searcher registered successfully' });
    } catch (error) {
        console.error('被修飾希望者の登録中にエラーが発生しました:', error);
        res.status(500).json({ error: 'Failed to register job searcher' });
    }
});

// レポート登録
app.post('/trigger/register-report', async (req, res) => {
    const { buildId, image } = req.body;
    try {
        await registerReport(buildId, image);
        res.status(200).json({ message: 'Report registered successfully' });
    } catch (error) {
        console.error(`レポート登録中にエラーが発生しました (buildId: ${buildId}):`, error);
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
app.delete('/trigger/delete-build', async (req, res) => {
    const { buildId } = req.body;
    try {
        await deleteBuildTrigger(buildId); // 非同期処理を待つ
        res.status(200).json({ message: 'Build deleted successfully' });
    } catch (error) {
        console.error(`物件削除中にエラーが発生しました (buildId: ${buildId}):`, error);
        res.status(500).json({ error: 'Failed to delete build' });
    }
});

// 家の購入許可が出たトリガー
app.post('/trigger/purchase-approved', async (req, res) => {
    const { buildId, jobSercherId } = req.body;
    try {
        await onPurchaseApprovedTrigger(buildId, jobSercherId); // 非同期処理を待つ
        res.status(200).json({ message: 'Purchase approved successfully' });
    } catch (error) {
        console.error(`購入許可処理中にエラーが発生しました (buildId: ${buildId}, jobSercherId: ${jobSercherId}):`, error);
        res.status(500).json({ error: 'Failed to approve purchase' });
    }
});

// サインアップ用のトリガー
app.post('/trigger/sign-up', async (req, res) => {
    console.log('サインアップ');
    const { name, birthday, payWay, pwd, mailAddress } = req.body;
    try {
        const result = await signUpTrigger(name, birthday, payWay, pwd, mailAddress); // 非同期処理を待つ
        if (result.success) {
            res.status(200).json({ message: 'Sign up processed successfully', data: result.result });
        } else {
            res.status(400).json({ error: 'Sign up failed', details: result.error });
        }
    } catch (error) {
        console.error('サインアップ処理中にエラーが発生しました:', error);
        res.status(500).json({ error: 'Failed to process sign up' });
    }
});

// ログイン用のトリガー
app.post('/trigger/login', async (req, res) => {
    console.log('ログイン');
    const { email, password } = req.body;
    console.log(`ログイン処理中: ${email}, ${password}`);
    try {
        const isLoggedIn = await loginTrigger(email, password); // 非同期処理を待つ
        if (isLoggedIn>0) {
            res.status(200).json({ message: 'Login successful',ownerId: isLoggedIn });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(`ログイン処理中にエラーが発生しました (mailAddress: ${email}):`, error);
        res.status(500).json({ error: 'Failed to process login' });
    }
});