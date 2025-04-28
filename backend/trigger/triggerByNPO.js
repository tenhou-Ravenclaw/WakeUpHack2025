const { agreeWorkBuildByNPO } = require('./algorthm/agreeWork')

function agreeWorkBuildByNPOTregger(jobSercherId,buildId){
    agreeWorkBuildByNPO();
}

function deleteJobSercherTrigger(workJobSercherId) {
    deleteWorkJobSearcher(workJobSercherId);
    // もし辞めた人が家の購入を希望した場合、その動作へ移動
    // onPropertySold(workJobSercherId,buildId)
}

module.exports = {
    agreeWorkBuildByNPOTregger,
    deleteJobSercherTrigger
};