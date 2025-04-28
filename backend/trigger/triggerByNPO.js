const { agreeWorkBuildByNPO } = require('./algorthm/agreeWork')
const { addJobsercher } = require('../dao/addJobsercher');

// 被修飾希望者の登録
function registerJobSercher(name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, NPOId) {
    addJobsercher(
        name,
        birthday,
        sex,
        rangeOfBehivior,
        transportation,
        isEmployed,
        wantedBuildId,
        assignedBuildId,
        NPOId
    );
}

function registerReport(buildId, image) {
    addReport(buildId, image)
}

// 働く担当者の確定
function agreeWorkBuildByNPOTregger(jobSercherId,buildIds){
    agreeWorkBuildByNPO(jobSercherId,buildIds);
}

// ホームレスの削除
function deleteJobSercherTrigger(workJobSercherId) {
    deleteWorkJobSearcher(workJobSercherId);
    // もし担当している家が残っていたら、マッチングし直し
    // matting();
}

//　購入希望が出た際の処理
function wantHomeJobSearcherTrigger(jobSercherId, buildId) {
    onPropertySold(jobSercherId, buildId);
}

module.exports = {
    registerJobSercher,
    registerReport,
    agreeWorkBuildByNPOTregger,
    deleteJobSercherTrigger,
    wantHomeJobSearcherTrigger,
};