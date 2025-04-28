import React from "react";
import { useNavigate } from "react-router-dom";
import "./previewCard.css";

const PreviewCard = ({
  images = [],
  address,
  cleaningFrequency,
  rooms,
  area,
  abandonmentHistory,
  saleIntent,
  agents = [],
  uploadedFile, // 親から渡されたアップロードされたファイル
}) => {
    const navigate = useNavigate(); // useNavigate フックを使ってリダイレクト

    const handleSubmit = () => {
        navigate("/mypage/report/register"); 
    }
  return (
    <div className="preview-card">
      {/* 画像エリア（左側） */}
      <section className="preview-card-left">
        <img
          src={images[0]} // 最初の画像を表示
          alt="物件画像"
          className="preview-card-img"
        />
      </section>

      {/* 右側エリア */}
      <section className="preview-card-right">
        {/* 物件情報エリア（上部） */}
        <div className="preview-property-info">
          <div><strong>住所:</strong> {address}</div>
          <div><strong>希望掃除頻度:</strong> {cleaningFrequency}</div>
          <div><strong>部屋数:</strong> {rooms}</div>
          <div><strong>のべ面積:</strong> {area}</div>
          <div><strong>放置歴:</strong> {abandonmentHistory}</div>
          <div><strong>売却意思:</strong> {saleIntent}</div>
        </div>

        {/* 横線 */}
        <div className="preview-card-divider" />

        {/* 担当者情報エリア（中部） */}
        <div className="preview-person-info">
          <div><strong>担当者:</strong></div>
          <div className="agent-list">
            {agents.map((agent, index) => (
              <div key={index} className="agent-item">
                <label>{agent}</label>
              </div>
            ))}
          </div>
        </div>

        {/* アップロードされたファイル名表示 */}
        {uploadedFile && (
          <div className="uploaded-file-info">
            <strong>アップロードされたファイル:</strong> {uploadedFile.name}
          </div>
        )}

        {/* 提出ボタン */}
        <button className="preview-submit-button" onClick={handleSubmit}>登録する</button>
      </section>
    </div>
  );
};

export default PreviewCard;
