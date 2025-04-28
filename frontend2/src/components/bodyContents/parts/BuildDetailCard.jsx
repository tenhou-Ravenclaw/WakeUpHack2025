import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buildDetailCard.css";

/**
 * 物件詳細カードコンポーネント（画像1枚）
 */
const BuildDetailCard = ({
  image, // 画像のURLを受け取る
  address,
  cleaningFrequency,
  rooms,
  area,
  abandonmentHistory,
  saleIntent,
  agents = [],
}) => {
  const [selectedAgents, setSelectedAgents] = useState([]); // チェックボックスの選択状態を管理
  const navigate = useNavigate(); // useNavigate フックを使ってリダイレクト

  const handleAgentChange = (event, agentIndex) => {
    if (event.target.checked) {
      setSelectedAgents([...selectedAgents, agentIndex]); // チェックされたエージェントを追加
    } else {
      setSelectedAgents(selectedAgents.filter((index) => index !== agentIndex)); // チェックが外れたエージェントを削除
    }
  };

  const handleSubmit = () => {
    // チェックボックスが選択されている場合、確認画面へのURLにリダイレクト
    if (selectedAgents.length > 0) {
      navigate("/mypage/report/confirmation_wanted"); // チェックボックスが選択されている場合
    } else {
      navigate("/mypage/report/confirmation"); // 何も選択されていない場合
    }
  };

  return (
    <div className="build-detail-card">
      {/* 画像エリア（左側） */}
      <section className="build-detail-card-left">
        {/* メイン画像 */}
        <img
          src={image}
          alt="建物画像"
          className="build-detail-card-img"
        />
      </section>

      {/* 右側エリア */}
      <section className="build-detail-card-right">
        {/* 物件基本情報（上部） */}
        <div className="detail-property-info">
          <div>
            <strong>住所:</strong> {address}
          </div>
          <div>
            <strong>希望掃除頻度:</strong> {cleaningFrequency}
          </div>
          <div>
            <strong>部屋数:</strong> {rooms}
          </div>
          <div>
            <strong>のべ面積:</strong> {area}
          </div>
          <div>
            <strong>放置歴:</strong> {abandonmentHistory}
          </div>
          <div>
            <strong>売却意思:</strong> {saleIntent}
          </div>
        </div>

        {/* 横線 */}
        <div className="build-detail-card-divider" />

        {/* 担当者＆アップロード（下部） */}
        <div className="detail-person-info">
          <div className="detail-person-label">【担当者】</div>
          <div className="agent-list">
            {agents.map((agent, index) => (
              <div key={index} className="agent-item">
                <input
                  type="checkbox"
                  id={`agent-${index}`}
                  onChange={(e) => handleAgentChange(e, index)} // チェックボックスの変更を監視
                />
                <label htmlFor={`agent-${index}`}>{agent}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="upload-section">
          <label htmlFor="report-upload" className="upload-label">
            報告書アップロード
          </label>
          <input type="file" id="report-upload" className="upload-input" />
        </div>

        <button className="submit-button" onClick={handleSubmit}>確認する</button>
      </section>
    </div>
  );
};

export default BuildDetailCard;
