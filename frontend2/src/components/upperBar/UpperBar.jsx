import React from "react";
import SubTitle from "./SubTitle";
import BackToMyPageButton from "./BackToMyPageButton";
import BackPageButton from "./BackPageButton";
import "./upperComponents.css";

/**
 * 画面上部表示コンテンツ
 * @param titleName 最左上表示の白文字タイトルを指定
 * @param subTitleName 左上表示表示の黒文字タイトルを表示
 * @param buttonLabel 戻るボタンに表示するラベル
 * @returns 
 */

const UpperBar = ({ titleName, subTitleName, buttonLabel }) => {
  return (
    <>
      <div className="background-rectangle">
        <h1 className="title">{titleName}</h1>

        {/* buttonLabel が null または undefined の場合に BackButton を表示しない */}
        {buttonLabel && <BackPageButton buttonLabel={buttonLabel} />}

        <BackToMyPageButton />
        <SubTitle subTitleName={subTitleName} />
      </div>
    </>
  );
};

export default UpperBar;
