/**
 * 
 * @param {int} buildId 
 * @param {int[]} mattchWorksearcher 
 * @param {boolean} flag 
 */
function agreeWorkBuildByNPO(buildId,mattchWorksearcher,flag) {
    // ホームレスが働くことに問題ないことを確認を受け取った際の処理
    // trueならば、contactNPOForWorkBuildを呼び出す
    if (flag) {
        contactNPOForWorkBuild(buildId,mattchWorksearcher);   
    }
}

/**
 * 
 * @param {int} buildId 
 * @param {int[]} mattchWorksearcher 
 * @param {boolean} flag 
 */
function WorkBuildByOwner(buildId,mattchWorksearcher,flag) {// 引数として、空き家のidとホームレスのidを受け取る
    // ホームレスが働くことに問題ないことを確認を受け取った際の処理
    // dbに書き加える
    if (true) {
        mattchWorksearcher.forEach(worker=>{
            addWorker(buildId,worker);
        })
    }
}

module.exports = {
    agreeWorkBuildByNPO,
    WorkBuildByOwner
};