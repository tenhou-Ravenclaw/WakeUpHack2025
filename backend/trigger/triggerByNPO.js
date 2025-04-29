const { agreeWorkBuildByNPO } = require('../algorythm/agreeWork')
const { onPropertySold } = require('../algorythm/buy')

const { addJobsercher } = require('../dao/jobsearcherTable');
const { addReport } = require('../dao/report')
const { deleteWorkJobSearcher } = require('../dao/jobsearcherTable')
const { setNPOData, getNPOData } = require('../dao/NPOTable')

// 被修飾希望者の登録
async function registerJobSercher(jobSercherData) {
    try {
        await addJobSercher(jobSercherData);
        console.log(`担当者の登録が成功しました:`, jobSercherData);
    } catch (error) {
        console.error(`担当者の登録中にエラーが発生しました:`, error);
        throw error;
    }
}

// レポート登録
async function registerReport(buildId, image) {
    try {
        await addReport(buildId, image);
        console.log(`物件ID ${buildId} のレポート登録が成功しました`);
    } catch (error) {
        console.error(`物件ID ${buildId} のレポート登録中にエラーが発生しました:`, error);
        throw error;
    }
}

// 働く担当者の確定
async function agreeWorkBuildByNPOTregger(jobSercherId, buildIds) {
    try {
        await agreeWorkBuildByNPO(jobSercherId, buildIds);
        console.log(`担当者ID ${jobSercherId} の物件確定が成功しました`);
    } catch (error) {
        console.error(`担当者ID ${jobSercherId} の物件確定中にエラーが発生しました:`, error);
        throw error;
    }
}

// ホームレスの削除
async function deleteJobSercherTrigger(workJobSercherId) {
    try {
        await deleteWorkJobSearcher(workJobSercherId);
        console.log(`担当者ID ${workJobSercherId} の削除が成功しました`);

        // もし担当している家が残っていたら、マッチングし直し
        try {
            await matting();
            console.log(`担当者ID ${workJobSercherId} の再マッチングが成功しました`);
        } catch (mattingError) {
            console.error(`担当者ID ${workJobSercherId} の再マッチング中にエラーが発生しました:`, mattingError);
            throw mattingError;
        }
    } catch (error) {
        console.error(`担当者ID ${workJobSercherId} の削除中にエラーが発生しました:`, error);
        throw error;
    }
}

// 購入希望が出た際の処理
async function wantHomeJobSearcherTrigger(jobSercherId, buildId) {
    try {
        await onPropertySold(jobSercherId, buildId);
        console.log(`担当者ID ${jobSercherId} の物件ID ${buildId} の購入希望処理が成功しました`);
    } catch (error) {
        console.error(`担当者ID ${jobSercherId} の物件ID ${buildId} の購入希望処理中にエラーが発生しました:`, error);
        throw error;
    }
}

// サインアップ用のトリガー
async function signUpNPOTrigger(_name, pwd, mailAddress) {
    try {
        await setNPOData(pwd, mailAddress);
        console.log(`NPOのサインアップが成功しました:`, { pwd, mailAddress });
        return true
    } catch (error) {
        console.error(`NPOのサインアップ中にエラーが発生しました:`, error);
        throw error;
    }
}

// サインイン用のトリガー
async function signInNPOTrigger(pwd, mailAddress) {
    try {
        const npoData = await getNPOData(mailAddress); // NPOデータを取得
        if (npoData && npoData.PWD === pwd) {
            console.log(`NPOのサインインが成功しました:`, { mailAddress });
            return { success: true, result: npoData };
        } else {
            console.error('サインイン失敗: パスワードが一致しません');
            return { success: false, error: 'Invalid email or password' };
        }
    } catch (error) {
        console.error(`NPOのサインイン中にエラーが発生しました:`, error);
        throw error;
    }
}

module.exports = {
    registerJobSercher,
    registerReport,
    agreeWorkBuildByNPOTregger,
    deleteJobSercherTrigger,
    wantHomeJobSearcherTrigger,
    signUpNPOTrigger,
    signInNPOTrigger
};