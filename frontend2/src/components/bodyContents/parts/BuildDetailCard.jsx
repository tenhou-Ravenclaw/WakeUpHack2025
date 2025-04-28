// BuildDetailCard.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./buildDetailCard.css";

import { useState } from "react";

/**
 * 物件詳細カードコンポーネント
 */
const BuildDetailCard = ({
  images = [],
  address,
  cleaningFrequency,
  rooms,
  area,
  abandonmentHistory,
  saleIntent,
  agents = [],
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="build-detail-card">
      {/* 左側：画像部分まとめ */}
      <div className="build-detail-card-left">
        {/* メイン画像スライダー */}
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="main-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`建物画像${idx}`}
                className="build-detail-card-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* サムネイルスライダー */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={`サムネイル${idx}`} className="thumb-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 右側：物件詳細情報 */}
      <div className="build-detail-card-info">
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

        <div className="build-detail-card-divider" />

        <div className="detail-person-info">
          <div className="detail-person-label">【担当者】</div>
          <div className="detail-person-links">
            {agents.map((agent, index) => (
              <a key={index} href={`/担当者/${agent}`}>
                {agent}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildDetailCard;
