import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import BuildCard from "../../components/bodyContents/parts/BuildCard";

/**
 * 物件売買の確認(物件一覧)
 * @returns 
 */
const BuildSalePage = () => {
  return (
    <>
      <UpperBar titleName={"【被就職者向け物件売買を確認する】"} subTitleName={"物件一覧"} />
      <div className="build-card-container">
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
        <BuildCard showCheckButton={true} isBuyer={true}/>
      </div>
    </>
  );
};

export default BuildSalePage;
