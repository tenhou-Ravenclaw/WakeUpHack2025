const { addBuildData } = require('./dao/buildTable');
const { needHumanNum } = require('./algorythm/needHumanNum');
const { mattingBetweenWorksearcherAndBuild } = require('./algorythm/matting');

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
function onPurchaseApproved(buildId,jobSercherId) {
    onPurchaseApproved(buildId,jobSercherId);
}

module.exports = {
    onPropertyRegistered, 
    WorkBuildByOwnerTrigger, 
    deleteBuildTrigger,
    onPurchaseApproved
};