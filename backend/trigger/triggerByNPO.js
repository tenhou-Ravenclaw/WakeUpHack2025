const { agreeWorkBuildByNPO } = require('./algorthm/agreeWork')
const { addJobsercher } = require('../dao/addJobsercher');

// 被修飾希望者の登録
function registerJobSercher(name, birthday, sex, rangeOfBehivior, transportation, isEmployed, wantedBuildId, assignedBuildId, deleteFlag, NPOId) {
    const jobSercherData = {
        name,
        birthday,
        sex,
        rangeOfBehivior,
        transportation,
        isEmployed,
        wantedBuildId,
        assignedBuildId,
        deleteFlag,
        NPOId
    };
    addJobsercher(jobSercherData);
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
    // もし辞めた人が家の購入を希望した場合、その動作へ移動
    // onPropertySold(workJobSercherId,buildId)
    // 希望しない場合、マッチングし直し
    // matting();
}

module.exports = {
    agreeWorkBuildByNPOTregger,
    deleteJobSercherTrigger
};