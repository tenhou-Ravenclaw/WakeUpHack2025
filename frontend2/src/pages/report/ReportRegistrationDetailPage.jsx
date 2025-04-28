import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import BuildDetailCard from "../../components/bodyContents/parts/BuildDetailCard";
import "./reportRegistrationDetailPage.css";

/**
 * 報告書登録画面(物件詳細)
 * @returns
 */
const ReportRegistrationDetailPage = () => {
  return (
    <>
      <UpperBar
        titleName={"【報告書を登録する】"}
        subTitleName={"物件詳細"}
        buttonLabel={"一覧へ戻る"}
      />
      <div className="detail-container">
        <BuildDetailCard />
      </div>
    </>
  );
};

export default ReportRegistrationDetailPage;
