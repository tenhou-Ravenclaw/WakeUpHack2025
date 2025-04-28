import React from "react";
import SubTitle from "./SubTitle";
import BackToMyPageButton from "./BackToMyPageButton";
import BackPageButton from "./BackPageButton";
import "./upperComponents.css";

/**
 * 画面上部表示コンテンツ
 * @param {string} titleName - 最左上表示の白文字タイトル
 * @param {string} subTitleName - 左上表示の黒文字サブタイトル
 * @param {string} buttonLabel - 戻るボタンに表示するラベル
 * @param {string} [listPath] - 「一覧へ戻る」時の遷移先パス（オプション）
 */
const UpperBar = ({ titleName, subTitleName, buttonLabel, listPath }) => {
  return (
    <div className="background-rectangle">
      <h1 className="title">{titleName}</h1>

      {/* buttonLabel がある場合のみ表示 */}
      {buttonLabel && <BackPageButton buttonLabel={buttonLabel} listPath={listPath} />}

      <BackToMyPageButton />
      <SubTitle subTitleName={subTitleName} />
    </div>
  );
};

export default UpperBar;
