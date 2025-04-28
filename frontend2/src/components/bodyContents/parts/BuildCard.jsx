import React from "react";
import "./buildCard.css";

/**
 * 一覧表示する時用の物件カード
 * @returns 
 */
const BuildCard = ({ imageSrc, address, cleaningFrequency, rooms, area, abandonmentHistory, saleIntent, agents = []}) => {
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
        
        {/* 担当者情報 */}
        <div className="person-info">
          <div className="person-label">【担当者】</div>
          <div className="person-links">
            {agents.map((agent, index) => (
              <a key={index} href={`/担当者/${agent}`}>{agent}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildCard;
