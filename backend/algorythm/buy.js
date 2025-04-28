const { wantHomeJobSearcher } = require('../dao/jobsearcherTable');
const { getBuildData } = require('../dao/buildTable');

function onPropertySold(buildId,jobSercherId) {
    // 購入希望が出た際の処理
    // オーナーにメールを送る
    // その他データ更新
    wantHomeJobSearcher(buildId,jobSercherId);
    const ownerData = getBuildData(buildId).ownerId;
    // contactOwner() TODO
}

function onPurchaseApproved(buildId,jobSercherId) {
    // 購入許可が返ってきた際の処理
    // NPOにメールを送る
    // その後の処理はメソッドを分けた方がいいかもしれない
    // contactNPO() TODO
}

module.exports = {
    onPropertySold,
    onPurchaseApproved
};