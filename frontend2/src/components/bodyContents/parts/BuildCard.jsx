import React from "react";
import { useNavigate } from "react-router-dom";  // useNavigateをインポート
import "./BuildCard.css";

/**
 * 一覧表示する時用の物件カード
 * @returns 
 */
const BuildCard = ({ 
  imageSrc, 
  address, 
  cleaningFrequency, 
  rooms, 
  area, 
  abandonmentHistory, 
  saleIntent, 
  agents = [], 
  showReportButton, 
  showCheckButton, 
  showManageButtons, 
  isBuyer = false  // ここでisBuyerを追加
}) => {
  const navigate = useNavigate(); // useNavigateを使って遷移するためのフックを取得

  // ボタンがクリックされたときの処理
  const handleReportClick = () => {
    navigate("/mypage/report/detail");  // reportボタンをクリックしたときの遷移
  };

  const handleCheckClick = () => {
    navigate("/mypage/sale/detail");  // saleボタンをクリックしたときの遷移
  };

  const handleManageClick = () => {
    console.log("管理ボタンがクリックされました！");  // manageボタンをクリックしたときの処理
  };

  return (
    <div className="build-card">
      {/* 物件画像 */}
      <img src={imageSrc} alt="建物画像" className="build-card-img" />
      
      {/* 物件情報と担当者部分 */}
      <div className="build-card-info">
        {/* 物件情報 */}
        <div className="property-info">
          <div><strong>住所:</strong> {address}</div>
          <div><strong>希望掃除頻度:</strong> {cleaningFrequency}</div>
          <div><strong>部屋数:</strong> {rooms}</div>
          <div><strong>のべ面積:</strong> {area}</div>
          <div><strong>放置歴:</strong> {abandonmentHistory}</div>
          <div><strong>売却意思:</strong> {saleIntent}</div>
        </div>
        
        <div className="build-card-divider"/>

        {/* 担当者または希望者情報 */}
        <div className="person-info">
          <div className="person-label">{isBuyer ? "【希望者】" : "【担当者】"}</div>
          <div className="person-links">
            {agents.map((agent, index) => (
              <a key={index} href={`/担当者/${agent}`}>{agent}</a>
            ))}
          </div>
        </div>
      </div>

      {/* 右端に配置されるエリア（ボタン） */}
      <div className="button-area">
        {showReportButton && <button className="button-report" onClick={handleReportClick}>登録する</button>}
        {showCheckButton && <button className="button-check" onClick={handleCheckClick}>確認する</button>}
        {showManageButtons && (
          <div className="button-manage">
            <button className="button-approve" onClick={handleManageClick}>承認する</button>
            <button className="button-reject" onClick={handleManageClick}>承認しない</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildCard;
