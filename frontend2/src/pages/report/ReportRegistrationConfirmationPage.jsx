import React from "react";
import UpperBar from "../../components/upperBar/UpperBar";

/**
 * 報告書提出確認画面(物件購入希望者なし)
 * @returns
 */
const ReportRegistrationConfirmationPage = () => {
  return (
    <>
      <UpperBar
        titleName={"【報告書を登録する】"}
        subTitleName={"物件詳細(確認画面)"}
      />
    </>
  );
};

export default ReportRegistrationConfirmationPage;
