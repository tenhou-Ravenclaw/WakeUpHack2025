import React, { useState } from "react";
import { Link } from "react-router-dom"; // Linkをインポート
import "./jobSearcherDetailCard.css"; // CSSファイルをインポート

/**
 * 被就職支援者の詳細情報を表示するカード
 * @param {object} props
 * @param {object} props.jobSearcher - 被就職支援者情報
 * @returns 
 */
const JobSearcherDetailCard = ({ jobSearcher }) => {
  const [selectedTransport, setSelectedTransport] = useState(jobSearcher.transport);

  const handleTransportChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTransport((prevTransport) =>
      checked ? [...prevTransport, value] : prevTransport.filter((item) => item !== value)
    );
  };

  return (
    <div className="job-searcher-detail-card">
      <div className="detail-left">
        <div className="info-item">
          <span className="info-label">氏名：</span>
          <span>{jobSearcher.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">生年月日：</span>
          <span>{jobSearcher.dob}</span>
        </div>
        <div className="info-item">
          <span className="info-label">性別：</span>
          <span>{jobSearcher.gender}</span>
        </div>
      </div>

      <div className="divide-line"></div> {/* 分割ライン */}

      <div className="detail-right">
        <div className="info-item">
          <span className="info-label">活動範囲：</span>
          <span>{jobSearcher.activityRange}</span>
        </div>

        <div className="info-item">
          <span className="info-label">移動手段：</span>
          <div className="transport-options">
            {["徒歩", "自転車", "自動車", "電車", "その他"].map((option) => (
              <div key={option} className="transport-option">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedTransport.includes(option)}
                  onChange={handleTransportChange}
                  disabled
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* ★ここ、リンク付きで表示する */}
        <div className="info-item">
          <span className="info-label">購入志望物件：</span>
          {jobSearcher.buyingPropertyId ? (
            <Link 
              to={`/mypage/building/detail/${jobSearcher.buyingPropertyId}`} 
              className="property-link"
            >
              {jobSearcher.buyingPropertyId}
            </Link>
          ) : (
            <span>未設定</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearcherDetailCard;
