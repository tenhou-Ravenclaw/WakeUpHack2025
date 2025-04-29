import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buildDetailCard.css";

/**
 * 物件詳細カードコンポーネント（画像1枚）
 */
const BuildDetailCard = ({
  image, 
  address,
  cleaningFrequency,
  rooms,
  area,
  abandonmentHistory,
  saleIntent,
  agents = [],
}) => {
  const [uploadedFile, setUploadedFile] = useState(null); // アップロードされたファイルを状態で管理
  const navigate = useNavigate(); // useNavigate フックを使ってリダイレクト

  // ファイル選択のハンドラ
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // ファイルが選択された時
    setUploadedFile(file); // 状態を更新
  };

  // 遷移時にファイルを渡す
  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("ファイルがアップロードされていません");
      return;
    }

    // アップロードされたファイルとその他の情報を遷移先に渡す
    navigate("/mypage/report/confirmation", {
      state: {
        uploadedFile, // アップロードされたファイル
        address,
        cleaningFrequency,
        rooms,
        area,
        abandonmentHistory,
        saleIntent,
        agents
      }
    });
  };

  return (
    <div className="build-detail-card">
      {/* 画像エリア（左側） */}
      <section className="build-detail-card-left">
        <img
          src={image}
          alt="建物画像"
          className="build-detail-card-img"
        />
      </section>

      {/* 右側エリア */}
      <section className="build-detail-card-right">
        {/* 物件基本情報 */}
        <div className="detail-property-info">
          <div><strong>住所:</strong> {address}</div>
          <div><strong>希望掃除頻度:</strong> {cleaningFrequency}</div>
          <div><strong>部屋数:</strong> {rooms}</div>
          <div><strong>のべ面積:</strong> {area}</div>
          <div><strong>放置歴:</strong> {abandonmentHistory}</div>
          <div><strong>売却意思:</strong> {saleIntent}</div>
        </div>

        {/* 担当者情報 */}
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

        {/* ファイルアップロード */}
        <div className="upload-section">
          <label htmlFor="report-upload" className="upload-label">
            報告書アップロード
          </label>
          <input
            type="file"
            id="report-upload"
            className="upload-input"
            onChange={handleFileChange} // ファイル選択時の処理
          />
        </div>

        {/* 提出ボタンで遷移 */}
        <button className="submit-button" onClick={handleSubmit}>確認する</button>
      </section>
    </div>
  );
};

export default BuildDetailCard;
