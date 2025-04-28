const db = require('../connectDB');

function addJobsercher(name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO jobSercher 
            (name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, deleteFlag, NPOId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, false, ?)
        `;
        const values = [name, birthday, sex, JSON.stringify(rangeOfBehivior), transportation, isEmployed, wantedBuildId, JSON.stringify(assignedBuildId), NPOId];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('求職者データ登録エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function deleteJobsercher(jobSercherId) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE jobSercher SET deleteFlag = true WHERE jobSercherId = ?`;
        db.query(query, [jobSercherId], (err, results) => {
            if (err) {
                console.error('求職者データ削除エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function updateJobsercher(jobSercherId, name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE jobSercher 
            SET name = ?, birthday = ?, sex = ?, rangeOfBehivior = ?, transportation = ?, 
            isEmployed = ?, wantedBuildId = ?, assignedBuildId = ?, NPOId = ? 
            WHERE jobSercherId = ?
        `;
        const values = [name, birthday, sex, JSON.stringify(rangeOfBehivior), transportation, isEmployed, wantedBuildId, JSON.stringify(assignedBuildId), NPOId, jobSercherId];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('求職者データ更新エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function addWorkJobSearcher(jobSercherId, buildId) {
    return new Promise((resolve, reject) => {
        // 最初に現在の割り当てられた建物IDを取得
        const getQuery = `SELECT assignedBuildId FROM jobSercher WHERE jobSercherId = ?`;
        db.query(getQuery, [jobSercherId], (err, results) => {
            if (err) {
                console.error('求職者データ取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                return reject(new Error('求職者が見つかりません'));
            }
            
            // 現在の建物IDリストに新しい建物IDを追加
            const currentBuildIds = JSON.parse(results[0].assignedBuildId || '[]');
            if (!currentBuildIds.includes(buildId)) {
                currentBuildIds.push(buildId);
            }
            
            // 更新されたリストでデータベースを更新
            const updateQuery = `UPDATE jobSercher SET assignedBuildId = ? WHERE jobSercherId = ?`;
            db.query(updateQuery, [JSON.stringify(currentBuildIds), jobSercherId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('求職者の作業建物追加エラー:', updateErr);
                    return reject(updateErr);
                }
                resolve(updateResults);
            });
        });
    });
}

function deleteWorkJobSearcher(jobSercherId, buildId) {
    return new Promise((resolve, reject) => {
        // 最初に現在の割り当てられた建物IDを取得
        const getQuery = `SELECT assignedBuildId FROM jobSercher WHERE jobSercherId = ?`;
        db.query(getQuery, [jobSercherId], (err, results) => {
            if (err) {
                console.error('求職者データ取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                return reject(new Error('求職者が見つかりません'));
            }
            
            // 現在の建物IDリストから指定された建物IDを削除
            const currentBuildIds = JSON.parse(results[0].assignedBuildId || '[]');
            const updatedBuildIds = currentBuildIds.filter(id => id !== buildId);
            
            // 更新されたリストでデータベースを更新
            const updateQuery = `UPDATE jobSercher SET assignedBuildId = ? WHERE jobSercherId = ?`;
            db.query(updateQuery, [JSON.stringify(updatedBuildIds), jobSercherId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('求職者の作業建物削除エラー:', updateErr);
                    return reject(updateErr);
                }
                resolve(updateResults);
            });
        });
    });
}

function wantHomeJobSearcher(jobSercherId, buildId) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE jobSercher SET wantedBuildId = ? WHERE jobSercherId = ?`;
        db.query(query, [buildId, jobSercherId], (err, results) => {
            if (err) {
                console.error('求職者の希望建物設定エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function getJobSearcher(jobSercherId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM jobSercher WHERE jobSercherId = ? AND deleteFlag = false`;
        db.query(query, [jobSercherId], (err, results) => {
            if (err) {
                console.error('求職者データ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function getAllJobSearchers() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM jobSercher WHERE deleteFlag = false`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('全求職者データ取得エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    addJobsercher,
    deleteJobsercher,
    updateJobsercher,
    addWorkJobSearcher,
    deleteWorkJobSearcher,
    wantHomeJobSearcher,
    getJobSearcher,
    getAllJobSearchers
};