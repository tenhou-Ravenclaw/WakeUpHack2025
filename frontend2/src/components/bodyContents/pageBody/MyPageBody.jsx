import React from "react";
import SubTitle from "../../upperBar/SubTitle"; // SubTitleコンポーネントをインポート
import "./mypageBody.css";

const MyPageBody = () => {
  return (
    <div className="mypage-container">
      <div className="upperBar">
        <SubTitle subTitleName="マイページ" color="#00ADAD" />
      </div>
      <div className="mypage-box">
        {/* 他のコンテンツがここに来る */}
        <button className="logout-button">ログアウト</button>

        {/* link-boxesラッパー */}
        <div className="link-boxes">
          {/* 1つ目のリンクボックス */}
          <div className="link-box">
            <a href="/page1">・被就職支援者を管理する</a>
          </div>

          {/* 2つ目のリンクボックス */}
          <div className="link-box">
            <a href="/page2">・物件管理担当を登録する</a>
          </div>

          {/* 3つ目のリンクボックス */}
          <div className="link-box">
            <a href="/page3">・報告書を登録する</a>
          </div>

          {/* 4つ目のリンクボックス */}
          <div className="link-box">
            <a href="/page4">・被就職支援者向け物件売買を確認する</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageBody;
