import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import BuildDetailBuyCard from "../../components/bodyContents/parts/BuildDetailBuyCard";

/**
 * 物件売買の確認(物件詳細)
 * @returns
 */
const BuildSaleDetailPage = () => {
  return (
    <>
      <UpperBar
        titleName={"【被就職者向け物件売買を確認する】"}
        subTitleName={"物件詳細"}
        buttonLabel={"一覧へ戻る"}
        listPath={"/mypage/sale/"}
      />
      <div className="detail-container">
        <BuildDetailBuyCard />
      </div>
    </>
  );
};

export default BuildSaleDetailPage;
