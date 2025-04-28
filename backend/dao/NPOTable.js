const db = require('../connectDB');

function setNPOData(mailAddress, pwd) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO NPO (mailAddress, PWD) VALUES (?, ?)`;
        db.query(query, [mailAddress, pwd], (err, results) => {
            if (err) {
                console.error('NPOデータ登録エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function getNPOData(NPOId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM NPO WHERE NPOId = ?`;
        db.query(query, [NPOId], (err, results) => {
            if (err) {
                console.error('NPOデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function getNPOData(mailAddress) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM NPO WHERE mailAddress = ?`;
        db.query(query, [mailAddress], (err, results) => {
            if (err) {
                console.error('NPOデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function updateNPOData(NPOId, mailAddress, pwd) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE NPO SET mailAddress = ?, PWD = ? WHERE NPOId = ?`;
        db.query(query, [mailAddress, pwd, NPOId], (err, results) => {
            if (err) {
                console.error('NPOデータ更新エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function getAllNPOs() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM NPO`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('全NPOデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    setNPOData,
    getNPOData,
    getNPOByEmail,
    updateNPOData,
    getAllNPOs
};

