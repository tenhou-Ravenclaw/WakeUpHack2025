/**
 * 
 * @param {int} buildId 
 * @returns int
 */
function needHumanNum(buildId) {
    // 家に対して必要な人員の計算
    // 家が登録されたことをトリガーにして実行
    // 計算後、mattingBetweenWorksearcherAndBuild()を実行
    // Idからbuildを取得,build.RoomSize,NumberOfRoom,NeglectPeriod,を取得
    // (( roomsize * NumberOfRoom * NeglectPeriod ) / nを返す) <- 仮案
    // TODO: どう実装すればええんやろか...
    return 1;
}
module.exports = { needHumanNum };