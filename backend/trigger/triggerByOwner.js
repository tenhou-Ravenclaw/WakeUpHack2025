const { addBuildData, deleteBuildData, deleteWorker, notificationDeleteBuildDate } = require('../dao/buildTable');
const { getOwnerByEmail, addOwner } = require('../dao/ownerTable');

const { needHumanNum } = require('../algorythm/needHumanNum');
const { mattingBetweenWorksearcherAndBuild } = require('../algorythm/matting');
const { WorkBuildByOwner } = require('../algorythm/agreeWork')
const { onPurchaseApproved } = require('../algorythm/buy')
// 物件が登録された際のトリガー
async function onPropertyRegistered(
    ownerId,
    location,
    roomSize,
    numberOfRooms,
    neglectPeriod,
    cleaningFrequency = null, // デフォルト値を設定
    roomPictureURL = null,   // デフォルト値を設定
    deedPictureURL = null,   // デフォルト値を設定
    sellIntention = 3,
    assignedJobSearcherId = null,
    deleteFlag = false
) {
    try {
        console.log('登録データ:', {
            ownerId,
            location,
            roomSize,
            numberOfRooms,
            neglectPeriod,
            cleaningFrequency,
            roomPictureURL,
            deedPictureURL,
            sellIntention,
            assignedJobSearcherId,
            deleteFlag,
        });

        await addBuildData(
            ownerId,
            location,
            roomSize,
            numberOfRooms,
            neglectPeriod,
            cleaningFrequency,
            "roomPictureURL",
            "deedPictureURL",
            sellIntention,
            assignedJobSearcherId,
            deleteFlag
        );

        console.log(`物件ID ${ownerId} の登録が成功しました`);
    } catch (error) {
        console.error(`物件登録中にエラーが発生しました:`, error);
        throw error;
    }
}


async function matting(buildId) {
    try {
        const num = await needHumanNum(buildId);
        await mattingBetweenWorksearcherAndBuild(buildId, num);
        console.log(`物件ID ${buildId} のマッチングが成功しました`);
    } catch (error) {
        console.error(`物件ID ${buildId} のマッチング中にエラーが発生しました:`, error);
        throw error;
    }
}

// 働く人に問題がないかを送ってもらったトリガー
async function WorkBuildByOwnerTrigger(buildId, jobSercherIds /* int[] */) {
    try {
        await WorkBuildByOwner(buildId, jobSercherIds);
        console.log(`物件ID ${buildId} の作業者登録が成功しました`);
    } catch (error) {
        console.error(`物件ID ${buildId} の作業者登録中にエラーが発生しました:`, error);
        throw error;
    }
}

// 家が売れたなどで、物件を消すトリガー
async function deleteBuildTrigger(buildId) {
    try {
        await deleteBuildData(buildId);
        await deleteWorker(buildId);
        await notificationDeleteBuildDate(buildId);
        console.log(`物件ID ${buildId} の削除が成功しました`);
    } catch (error) {
        console.error(`物件ID ${buildId} の削除中にエラーが発生しました:`, error);
        throw error; // 必要に応じてエラーを再スロー
    }
}

// 家の購入許可が出たトリガー
async function onPurchaseApprovedTrigger(buildId, jobSercherId) {
    try {
        await onPurchaseApproved(buildId, jobSercherId);
        console.log(`物件ID ${buildId} の購入許可が成功しました`);
    } catch (error) {
        console.error(`物件ID ${buildId} の購入許可中にエラーが発生しました:`, error);
        throw error;
    }
}

// サインアップようのトリガー
async function signUpTrigger(name, birthday, payWay, pwd, mailAddress) {
    try {
        const result = await addOwner(
            name,
            birthday,
            payWay,
            pwd,
            mailAddress
        );
        console.log('サインアップ成功:', result);
        return { success: true, result };
    } catch (error) {
        console.error('サインアップエラー:', error);
        return { success: false, error };
    }
}


// ログイン用のトリガー
async function loginTrigger(mailAddress, pwd) {
    try {
        const owner = await getOwnerByEmail(mailAddress);
        console.log(owner);
        if (!owner) {
            return false;
        }

        // パスワードチェック
        if (owner.PWD === pwd) {
            return owner.ownerId;
        } else {
            return -1;
        }
    } catch (error) {
        console.error('ログイントリガーエラー:', error);
        return -1;
    }
}


module.exports = {
    onPropertyRegistered, 
    WorkBuildByOwnerTrigger, 
    deleteBuildTrigger,
    onPurchaseApprovedTrigger,
    signUpTrigger,
    loginTrigger
};