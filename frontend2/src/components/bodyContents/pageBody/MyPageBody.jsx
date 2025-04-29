import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import SubTitle from "../../upperBar/SubTitle"; // SubTitleコンポーネントをインポート
import "./myPageBody.css";

/**
 * マイページのBody書いてます
 * @returns 
 */
const MyPageBody = () => {
  const navigate = useNavigate(); // useNavigateを使って遷移関数を取得

  // ログアウト処理（遷移）
  const handleLogout = () => {
    // ここにログアウト処理を追加（例えば、セッションの削除など）
    navigate("/login"); // /login に遷移
  };

  return (
    <div className="mypage-container">
      <div className="mypage-box">
        {/* 他のコンテンツがここに来る */}
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>

        {/* link-boxesラッパー */}
        <div className="link-boxes">
          {/* 1つ目のリンクボックス */}
          <div className="link-box">
            <a href="/mypage/jobsearcher">・被就職支援者を管理する</a>
          </div>

          {/* 2つ目のリンクボックス */}
          <div className="link-box">
            <a href="/mypage/buildmanage">・物件管理担当を登録する</a>
          </div>

          {/* 3つ目のリンクボックス */}
          <div className="link-box">
            <a href="/mypage/report/register">・報告書を登録する</a>
          </div>

          {/* 4つ目のリンクボックス */}
          <div className="link-box">
            <a href="/mypage/sale">・被就職支援者向け物件売買を確認する</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageBody;
