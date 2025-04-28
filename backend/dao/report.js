const db = require('../connectDB');

/**
 * レポートを追加する関数
 * @param {number} buildId 建物ID
 * @param {string} reportPath レポートファイルへのパス/URL
 * @param {Date} reportDate レポート作成日（省略可）
 */
function addReport(buildId, reportPath, reportDate = new Date()) {
    return new Promise((resolve, reject) => {
        // 既存のレポートを確認
        const checkQuery = `SELECT * FROM report WHERE buildId = ?`;
        db.query(checkQuery, [buildId], (err, results) => {
            if (err) {
                console.error('レポート確認エラー:', err);
                return reject(err);
            }
            
            // レポート情報をオブジェクトに格納
            const reportInfo = {
                path: reportPath,
                date: reportDate.toISOString()
            };
            
            if (results.length === 0) {
                // 初回レポートの場合、新しいレコードを作成
                const insertQuery = `INSERT INTO report (buildId, firstReport, regularReport) VALUES (?, ?, ?)`;
                db.query(insertQuery, [buildId, reportPath, JSON.stringify([])], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('初回レポート登録エラー:', insertErr);
                        return reject(insertErr);
                    }
                    resolve(insertResults);
                });
            } else {
                // 既に初回レポートが存在する場合、定期レポートに追加
                const regularReports = JSON.parse(results[0].regularReport || '[]');
                regularReports.push(reportInfo);
                
                const updateQuery = `UPDATE report SET regularReport = ? WHERE buildId = ?`;
                db.query(updateQuery, [JSON.stringify(regularReports), buildId], (updateErr, updateResults) => {
                    if (updateErr) {
                        console.error('定期レポート追加エラー:', updateErr);
                        return reject(updateErr);
                    }
                    resolve(updateResults);
                });
            }
        });
    });
}

/**
 * 特定の建物のレポートを取得する関数
 * @param {number} buildId 建物ID
 */
function viewReport(buildId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM report WHERE buildId = ?`;
        db.query(query, [buildId], (err, results) => {
            if (err) {
                console.error('レポート取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                resolve({ firstReport: null, regularReports: [] });
            } else {
                const report = results[0];
                const regularReports = JSON.parse(report.regularReport || '[]');
                resolve({
                    buildId: report.buildId,
                    reportId: report.reportId,
                    firstReport: report.firstReport, // URLまたはパスを返す
                    regularReports: regularReports  // URL/パスと日付を含むオブジェクトの配列
                });
            }
        });
    });
}

/**
 * すべてのレポートを取得する関数
 */
function getAllReports() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM report`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('全レポート取得エラー:', err);
                return reject(err);
            }
            
            const formattedResults = results.map(report => {
                return {
                    buildId: report.buildId,
                    reportId: report.reportId,
                    firstReport: report.firstReport, // URLまたはパス
                    regularReports: JSON.parse(report.regularReport || '[]') // URL/パスと日付を含むオブジェクトの配列
                };
            });
            
            resolve(formattedResults);
        });
    });
}

/**
 * 複数の建物IDに対応するレポートを取得する関数
 * @param {number[]} buildIds 建物IDの配列
 */
function getReportsByBuildIds(buildIds) {
    return new Promise((resolve, reject) => {
        if (!buildIds.length) {
            return resolve([]);
        }
        
        const placeholders = buildIds.map(() => '?').join(',');
        const query = `SELECT * FROM report WHERE buildId IN (${placeholders})`;
        
        db.query(query, buildIds, (err, results) => {
            if (err) {
                console.error('複数建物のレポート取得エラー:', err);
                return reject(err);
            }
            
            const formattedResults = results.map(report => {
                return {
                    buildId: report.buildId,
                    reportId: report.reportId,
                    firstReport: report.firstReport, // URLまたはパス
                    regularReports: JSON.parse(report.regularReport || '[]') // URL/パスと日付を含むオブジェクトの配列
                };
            });
            
            resolve(formattedResults);
        });
    });
}

/**
 * レポートURLを更新する関数
 * @param {number} buildId 建物ID
 * @param {number} reportIndex レポートのインデックス（-1は初回レポート、0以上は定期レポートの添字）
 * @param {string} newPath 新しいレポートパス/URL
 */
function updateReportUrl(buildId, reportIndex, newPath) {
    return new Promise((resolve, reject) => {
        // 既存のレポートを取得
        const getQuery = `SELECT * FROM report WHERE buildId = ?`;
        db.query(getQuery, [buildId], (err, results) => {
            if (err) {
                console.error('レポート取得エラー:', err);
                return reject(err);
            }
            
            if (results.length === 0) {
                return reject(new Error('レポートが見つかりません'));
            }
            
            const report = results[0];
            
            if (reportIndex === -1) {
                // 初回レポートの更新
                const updateQuery = `UPDATE report SET firstReport = ? WHERE buildId = ?`;
                db.query(updateQuery, [newPath, buildId], (updateErr, updateResults) => {
                    if (updateErr) {
                        console.error('初回レポート更新エラー:', updateErr);
                        return reject(updateErr);
                    }
                    resolve(updateResults);
                });
            } else {
                // 定期レポートの更新
                const regularReports = JSON.parse(report.regularReport || '[]');
                
                if (reportIndex < 0 || reportIndex >= regularReports.length) {
                    return reject(new Error('指定されたレポートインデックスが範囲外です'));
                }
                
                // パスを更新し、日付は現在の日付を保持
                regularReports[reportIndex].path = newPath;
                
                const updateQuery = `UPDATE report SET regularReport = ? WHERE buildId = ?`;
                db.query(updateQuery, [JSON.stringify(regularReports), buildId], (updateErr, updateResults) => {
                    if (updateErr) {
                        console.error('定期レポート更新エラー:', updateErr);
                        return reject(updateErr);
                    }
                    resolve(updateResults);
                });
            }
        });
    });
}

module.exports = {
    addReport,
    viewReport,
    getAllReports,
    getReportsByBuildIds,
    updateReportUrl
};