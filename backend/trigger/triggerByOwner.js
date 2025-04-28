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
    const num = needHumanNum(buildId);
    mattingBetweenWorksearcherAndBuild(num);
}

function WorkBuildByOwnerTrigger(buildId,jobSercherIds/*int[]*/) {
    WorkBuildByOwner(buildId,jobSercherIds);
}

function deleteBuildTrigger(buildId){
    deleteBuildData(buildId);
    deleteWorker(buildId);
    notificationDeleteBuildDate(buildId);
}

module.exports = { 
    onPropertyRegistered, 
    WorkBuildByOwnerTrigger, 
    deleteBuildTrigger 
};