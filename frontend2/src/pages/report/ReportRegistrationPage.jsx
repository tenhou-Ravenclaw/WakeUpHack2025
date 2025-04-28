import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import BuildCard from "../../components/bodyContents/parts/BuildCard";
import "./reportRegistrationPage.css";

/**
 * 報告書登録ページ(物件一覧)
 * @returns
 */
const ReportRegistrationPage = () => {
  return (
    <>
      <UpperBar titleName={"【報告書を登録する】"} subTitleName={"物件一覧"} />
      <div className="build-card-container">
        {/* BuildCard を 3 回表示 */}
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
        <BuildCard showReportButton={true}/>
      </div>
    </>
  );
};

export default ReportRegistrationPage;
