const { addBuildData, deleteBuildData, deleteWorker, notificationDeleteBuildDate } = require('../dao/buildTable');
const { getOwnerByEmail, addOwner } = require('../dao/ownerTable');

const { needHumanNum } = require('../algorythm/needHumanNum');
const { mattingBetweenWorksearcherAndBuild } = require('../algorythm/matting');
const { WorkBuildByOwner } = require('../algorythm/agreeWork')
const { onPurchaseApproved } = require('../algorythm/buy')
// 物件が登録された際のトリガー
function onPropertyRegistered(
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
    deleteFlag
) {
    addBuildData(
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
        deleteFlag
    )
    matting(buildId);
}

function matting(buildId) {
    const num = needHumanNum(buildId);
    mattingBetweenWorksearcherAndBuild(num);
}

// 働く人に問題がないかを送ってもらったトリガー
function WorkBuildByOwnerTrigger(buildId,jobSercherIds/*int[]*/) {
    WorkBuildByOwner(buildId,jobSercherIds);
}

// 家が売れたなどで、物件を消すトリガー
function deleteBuildTrigger(buildId){
    deleteBuildData(buildId);
    deleteWorker(buildId);
    notificationDeleteBuildDate(buildId);
}

// 家の購入許可が出たトリガー
function onPurchaseApprovedTrigger(buildId,jobSercherId) {
    onPurchaseApproved(buildId,jobSercherId);
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
        
        if (!owner) {
            return false;
        }

        // パスワードチェック
        if (owner.PWD === pwd) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('ログイントリガーエラー:', error);
        return false;
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