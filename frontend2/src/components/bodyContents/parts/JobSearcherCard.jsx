import React from "react";
import "./jobSearcherCard.css"; // CSSファイルをインポート

/**
 * JobSearcherの表示カードコンポーネント
 * @param {object} props - jobSearcher情報を受け取る
 * @returns JSX
 */
const JobSearcherCard = ({ jobSearcher ,onDetailClick}) => {
  return (
    <div className="job-searcher-card">
      <div className="left-info">
        <div className="info-item">
          <span className="info-label">【氏名】</span>
          <span>{jobSearcher.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">【生年月日】</span>
          <span>{jobSearcher.dob}</span>
        </div>
        <div className="info-item">
          <span className="info-label">【性別】</span>
          <span>{jobSearcher.gender}</span>
        </div>
      </div>
      <button className="detail-button" onClick={onDetailClick}>詳細</button>
    </div>
  );
};

export default JobSearcherCard;
