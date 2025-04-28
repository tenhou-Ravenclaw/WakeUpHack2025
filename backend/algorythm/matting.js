const { getBuildById } = require('../dao/buildTable');
const { getJobSearchers } = require('../dao/jobsearcherTable');
const { contactNPOForWorkBuild } = require('./contact');
/**
 * 
 * @param {int} buildId 
 * @param {int} requiredPeople 
 * @returns int[]
 */
async function mattingBetweenWorksearcherAndBuild(buildId,requiredPeople) {
    // 物件情報を取得
    const build = await getBuildById(buildId);
    if (!build) {
        return { buildId, mattchWorksearcher: [] };
    }

    const { latitude: buildLat, longitude: buildLon } = build.location;

    // 求職者一覧を取得
    const jobSearchers = await getJobSearchers();

    // 範囲内の求職者をフィルタリング
    const matchedWorksearchers = jobSearchers.filter((jobSearcher) => {
        const { rangeOfBehavior } = jobSearcher;
        const [lat1, lon1, lat2, lon2] = rangeOfBehavior;

        return (
            buildLat >= Math.min(lat1, lat2) &&
            buildLat <= Math.max(lat1, lat2) &&
            buildLon >= Math.min(lon1, lon2) &&
            buildLon <= Math.max(lon1, lon2)
        );
    });

    // 必要人数分を選択
    const selectedWorksearchers = matchedWorksearchers.slice(0, requiredPeople).map(ws => ws.id);

    // NPOに送信
    if (selectedWorksearchers.length > 0) {
        contactNPOForWorkBuild({ buildId, selectedWorksearchers });
    }

    return { buildId, mattchWorksearcher: selectedWorksearchers };
}
module.exports = { mattingBetweenWorksearcherAndBuild };