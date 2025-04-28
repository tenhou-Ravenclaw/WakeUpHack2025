import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import BuildCard from "../../components/bodyContents/parts/BuildCard";
import "./BuildManagePage.css";

/**
 * 物件管理担当を確認するページ(物件一覧)
 * @returns
 */
const BuildManagePage = () => {
  return (
    <>
      <UpperBar
        titleName={"【物件管理担当を登録する】"}
        subTitleName={"物件一覧"}
      />
      <div className="build-card-container">
        {/* BuildCard を 3 回表示 */}
        <BuildCard />
        <BuildCard />
        <BuildCard />
      </div>
    </>
  );
};

export default BuildManagePage;
