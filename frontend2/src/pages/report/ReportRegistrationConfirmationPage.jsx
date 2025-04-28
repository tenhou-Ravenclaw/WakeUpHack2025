import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import PreviewCard from "../../components/bodyContents/parts/PreviewCard";
import "./reportRegistrationConfirmationPage.css";

/**
 * 報告書提出確認画面(物件購入希望者なし)
 * @returns
 */
const ReportRegistrationConfirmationPage = () => {
  // ここでPreviewCardに渡すためのプロパティを設定します
  const images = [
    "image1.jpg", // 例: 画像URLを適切に指定
    "image2.jpg",
  ];
  const address = "東京都新宿区1-2-3";
  const cleaningFrequency = "週1回";
  const rooms = "3部屋";
  const area = "100㎡";
  const abandonmentHistory = "なし";
  const saleIntent = "あり";
  const agents = ["担当者1", "担当者2"];

  return (
    <>
      <UpperBar
        titleName={"【報告書を登録する】"}
        subTitleName={"物件詳細(確認画面)"}
        buttonLabel={"前のページに戻る"}
      />
      <div className="preview-container">
        <PreviewCard
          images={images}
          address={address}
          cleaningFrequency={cleaningFrequency}
          rooms={rooms}
          area={area}
          abandonmentHistory={abandonmentHistory}
          saleIntent={saleIntent}
          agents={agents}
        />
      </div>
    </>
  );
};

export default ReportRegistrationConfirmationPage;
