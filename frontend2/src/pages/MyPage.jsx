import React from "react";
import MyPageBody from "../components/bodyContents/pageBody/MyPageBody";
import SubTitle from '../components/upperBar/SubTitle'; // サブタイトルコンポーネントをインポート

/**
 * マイページ
 * @returns
 */
const MyPage = () => {
  return (
    <div>
      <SubTitle subTitleName="マイページ" color="#00ADAD" />
      <MyPageBody />
    </div>
  );
};

export default MyPage;
