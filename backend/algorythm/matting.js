function mattingBetweenWorksearcherAndBuild(params) {//引数(物件情報,必要人数)
    // 位置関係を見て担当できるホームレスを見つける
    // buildIdから物件の取得、build.Locationから(緯度,経度)を取得
    // jobSercher一覧から、RangeOfBehiviorを取得(緯度1,経度1,緯度2,経度2)
    //　範囲内にbuildIdがあればマッチ
    // もし見つかれば、必要な人数分をNPOに送信。いなければ、mattchWorksearcherを空で送信
    /* 
    {
    buildId:int,
    mattchWorksearcher:jobSercherId(int)[]    
    }
     */
}

module.exports = { mattingBetweenWorksearcherAndBuild };