const db = require('../connectDB');
const buildTable = require('./buildTable');

function addOwner(name, birthday, payWay, pwd, mailAddress) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Owner (name, birthday, payWay, PWD, mailAddress) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, birthday, payWay, pwd, mailAddress];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('オーナーデータ登録エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function deleteOwner(ownerId) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Owner WHERE ownerId = ?`;
        db.query(query, [ownerId], (err, results) => {
            if (err) {
                console.error('オーナーデータ削除エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function getOwner(ownerId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Owner WHERE ownerId = ?`;
        db.query(query, [ownerId], (err, results) => {
            if (err) {
                console.error('オーナーデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function getOwnerByEmail(mailAddress) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Owner WHERE mailAddress = ?`;
        db.query(query, [mailAddress], (err, results) => {
            if (err) {
                console.error('オーナーデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function updateOwner(ownerId, name, birthday, payWay, pwd, mailAddress) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE Owner 
            SET name = ?, birthday = ?, payWay = ?, PWD = ?, mailAddress = ? 
            WHERE ownerId = ?
        `;
        const values = [name, birthday, payWay, pwd, mailAddress, ownerId];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('オーナーデータ更新エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function addHoldBuild(buildId, ownerId, location, roomsize, numberOfRooms, neglectPeriod, cleaningFrequency, roomPictureURL, deedPictureURL, sellIntention) {
    // buildTableのaddBuildDataを呼び出す
    return buildTable.addBuildData(
        buildId, 
        ownerId,
        location,
        roomsize,
        numberOfRooms,
        neglectPeriod,
        cleaningFrequency,
        roomPictureURL,
        deedPictureURL,
        sellIntention,
        null, // assignedJobSearcherId は未設定
        false // deleteFlag
    );
}

function deleteHoldBuild(buildId) {
    // buildTableのdeleteBuildDataを呼び出す
    return buildTable.deleteBuildData(buildId);
}

function getOwnerBuilds(ownerId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM build WHERE ownerId = ? AND deleteFlag = false`;
        db.query(query, [ownerId], (err, results) => {
            if (err) {
                console.error('オーナーの建物データ取得エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function getAllOwners() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Owner`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('全オーナーデータ取得エラー:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    addOwner,
    deleteOwner,
    getOwner,
    getOwnerByEmail,
    updateOwner,
    addHoldBuild,
    deleteHoldBuild,
    getOwnerBuilds,
    getAllOwners
};

