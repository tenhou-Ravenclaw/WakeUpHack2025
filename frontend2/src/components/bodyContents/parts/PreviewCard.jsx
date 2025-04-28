import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./previewCard.css";

const PreviewCard = () => {
  const location = useLocation(); // useLocation フックで渡された状態を受け取る
  const navigate = useNavigate(); // useNavigate フックを使ってリダイレクト

  // location.state から必要なデータを抽出
  const {
    uploadedFile, // アップロードされたファイル
    address,
    cleaningFrequency,
    rooms,
    area,
    abandonmentHistory,
    saleIntent,
    agents
  } = location.state || {};

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("ファイルがアップロードされていません");
      return;
    }

    // ファイルがある場合、登録画面へ遷移
    navigate("/mypage/report/register"); 
  };

  return (
    <div className="preview-card">
      {/* 画像エリア（左側） */}
      <section className="preview-card-left">
        <img
          src={uploadedFile ? URL.createObjectURL(uploadedFile) : "/path/to/default-image.jpg"} // アップロードされたファイルのプレビュー
          alt="物件画像"
          className="preview-card-img"
        />
      </section>

      {/* 右側エリア */}
      <section className="preview-card-right">
        {/* 物件情報エリア */}
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

        {/* 担当者情報エリア */}
        <div className="preview-person-info">
          <div><strong>担当者:</strong></div>
          <div className="agent-list">
            {agents && agents.map((agent, index) => (
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
