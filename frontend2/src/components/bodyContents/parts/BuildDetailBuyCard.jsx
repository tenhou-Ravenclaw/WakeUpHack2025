import React from "react";
import "./buildDetailCard.css";

/**
 * 物件詳細カードコンポーネント（画像1枚版＋購入志望欄付き）
 */
const BuildDetailBuyCard = ({
  image, // 画像URL
  address,
  cleaningFrequency,
  rooms,
  area,
  abandonmentHistory,
  saleIntent,
  agents = [],
  ownerReplyMessage = null, // ★オーナーのメッセージ（追加）
}) => {
  return (
    <div className="build-detail-card">
      {/* 左側：画像 */}
      <section className="build-detail-card-left">
        <img src={image} alt="建物画像" className="build-detail-card-img" />
      </section>

      {/* 右側：情報 */}
      <section className="build-detail-card-right">
        {/* 物件情報 */}
        <div className="detail-property-info">
          <div><strong>住所:</strong> {address}</div>
          <div><strong>希望掃除頻度:</strong> {cleaningFrequency}</div>
          <div><strong>部屋数:</strong> {rooms}</div>
          <div><strong>のべ面積:</strong> {area}</div>
          <div><strong>放置歴:</strong> {abandonmentHistory}</div>
          <div><strong>売却意思:</strong> {saleIntent}</div>
        </div>

        {/* 横線 */}
        <div className="build-detail-card-divider" />

        {/* 担当者リスト */}
        <div className="detail-person-info">
          <div className="detail-person-label">【担当者】</div>
          <div className="agent-list">
            {agents.map((agent, index) => (
              <div key={index} className="agent-item">
                <label>{agent}</label>
              </div>
            ))}
          </div>
        </div>

        {/* 現在購入志望物件に対するオーナー返答 */}
        <div className="buy-status-box">
          <span className="info-label">ステータス：</span>
          <div className="owner-reply-message">
            {ownerReplyMessage ? (
              <>オーナーからメッセージ: 「{ownerReplyMessage}」</>
            ) : (
              <>オーナーに確認中です</>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildDetailBuyCard;
