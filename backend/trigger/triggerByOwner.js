const { addBuildData, deleteBuildData, deleteWorker, notificationDeleteBuildDate } = require('../dao/buildTable');
const { getOwner, addOwner } = require('../dao/ownerTable');

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
function signUpTrigger(
    name,
    birthday,
    payWay,
    pwd,
    mailAddress
) {
    // オーナーのサインアップ
    addOwner(
        name,
        birthday,
        payWay,
        pwd,
        mailAddress
    )
}

// ログイン用のトリガー
function loginTrigger(
    mailAddress,
    pwd
) {
    // オーナーのログイン
    const owner = getOwner(
        mailAddress,
        pwd
    )
    if (owner) {
        return true;
    }
    return false;
}

module.exports = {
    onPropertyRegistered, 
    WorkBuildByOwnerTrigger, 
    deleteBuildTrigger,
    onPurchaseApprovedTrigger,
    signUpTrigger,
    loginTrigger
};