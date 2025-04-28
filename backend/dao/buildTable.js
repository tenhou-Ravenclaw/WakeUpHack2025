const db = require('../connectDB');

function addBuildData(buildId, ownerId, location, roomsize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention, assignedJobSearcherId, deleteFlag) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO build 
            (buildId, ownerId, location, roomSize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention, assignedJobSearcherId, deleteFlag) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [buildId, ownerId, JSON.stringify(location), roomsize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention, assignedJobSearcherId, deleteFlag];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('建物データ登録エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function deleteBuildData(buildId) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE build SET deleteFlag = true WHERE buildId = ?`;
        db.query(query, [buildId], (err, results) => {
            if (err) {
                console.error('建物データ削除エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function addWorker(buildId, jobSearcherId) {
    return new Promise((resolve, reject) => {
        // 最初に建物データを取得して、すでに作業者が割り当てられているか確認
        const getQuery = `SELECT assignedJobSearcherId FROM build WHERE buildId = ? AND deleteFlag = false`;
        db.query(getQuery, [buildId], (err, results) => {
            if (err) {
                console.error('建物データ取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                return reject(new Error('建物が見つからないか、すでに削除されています'));
            }
            
            // 現在の作業者を割り当て
            const updateQuery = `UPDATE build SET assignedJobSearcherId = ? WHERE buildId = ?`;
            db.query(updateQuery, [jobSearcherId, buildId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('建物に対する作業者登録エラー:', updateErr);
                    return reject(updateErr);
                }
                
                // 作業者のテーブルも更新する必要がある場合
                const jobSearcherQuery = `SELECT assignedBuildId FROM jobSercher WHERE jobSercherId = ?`;
                db.query(jobSearcherQuery, [jobSearcherId], (jsErr, jsResults) => {
                    if (jsErr) {
                        console.error('作業者データ取得エラー:', jsErr);
                        return reject(jsErr);
                    }
                    
                    if (jsResults.length === 0) {
                        return resolve(updateResults); // 作業者が見つからない場合は建物の更新だけ行う
                    }
                    
                    // 作業者の割り当て建物を更新
                    let assignedBuilds = [];
                    try {
                        assignedBuilds = JSON.parse(jsResults[0].assignedBuildId || '[]');
                        if (!assignedBuilds.includes(buildId)) {
                            assignedBuilds.push(buildId);
                        }
                    } catch (e) {
                        assignedBuilds = [buildId];
                    }
                    
                    const updateJSQuery = `UPDATE jobSercher SET assignedBuildId = ? WHERE jobSercherId = ?`;
                    db.query(updateJSQuery, [JSON.stringify(assignedBuilds), jobSearcherId], (updateJSErr) => {
                        if (updateJSErr) {
                            console.error('作業者の建物割り当てエラー:', updateJSErr);
                            return reject(updateJSErr);
                        }
                        resolve(updateResults);
                    });
                });
            });
        });
    });
}

function deleteWorker(buildId) {
    return new Promise((resolve, reject) => {
        // 最初に現在の作業者IDを取得
        const getQuery = `SELECT assignedJobSearcherId FROM build WHERE buildId = ? AND deleteFlag = false`;
        db.query(getQuery, [buildId], (err, results) => {
            if (err) {
                console.error('建物データ取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                return reject(new Error('建物が見つからないか、すでに削除されています'));
            }
            
            const jobSearcherId = results[0].assignedJobSearcherId;
            
            // 建物テーブルの作業者をNULLに設定
            const updateQuery = `UPDATE build SET assignedJobSearcherId = NULL WHERE buildId = ?`;
            db.query(updateQuery, [buildId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('建物に対する作業者削除エラー:', updateErr);
                    return reject(updateErr);
                }
                
                // jobSearcherId がNULLの場合は作業者テーブルを更新する必要はない
                if (!jobSearcherId) {
                    return resolve(updateResults);
                }
                
                // 作業者テーブルの割り当て建物からこの建物を削除
                const jobSearcherQuery = `SELECT assignedBuildId FROM jobSercher WHERE jobSercherId = ?`;
                db.query(jobSearcherQuery, [jobSearcherId], (jsErr, jsResults) => {
                    if (jsErr) {
                        console.error('作業者データ取得エラー:', jsErr);
                        return reject(jsErr);
                    }
                    
                    if (jsResults.length === 0) {
                        return resolve(updateResults);
                    }
                    
                    let assignedBuilds = [];
                    try {
                        assignedBuilds = JSON.parse(jsResults[0].assignedBuildId || '[]');
                        assignedBuilds = assignedBuilds.filter(id => id !== buildId);
                    } catch (e) {
                        assignedBuilds = [];
                    }
                    
                    const updateJSQuery = `UPDATE jobSercher SET assignedBuildId = ? WHERE jobSercherId = ?`;
                    db.query(updateJSQuery, [JSON.stringify(assignedBuilds), jobSearcherId], (updateJSErr) => {
                        if (updateJSErr) {
                            console.error('作業者の建物割り当て解除エラー:', updateJSErr);
                            return reject(updateJSErr);
                        }
                        resolve(updateResults);
                    });
                });
            });
        });
    });
}

function getBuildData(buildId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM build WHERE buildId = ? AND deleteFlag = false`;
        db.query(query, [buildId], (err, results) => {
            if (err) {
                console.error('建物データ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function getAllBuilds() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM build WHERE deleteFlag = false`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('全建物データ取得エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    addBuildData,
    deleteBuildData,
    addWorker,
    deleteWorker,
    getBuildData,
    getAllBuilds
};
