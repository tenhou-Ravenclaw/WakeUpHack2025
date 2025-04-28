import React from 'react';
import "./upperComponents.css";

/**
 * 毎ページに表示される左上らへんの黒字サブタイトルパーツ
 * @param subTitleName ???一覧、???詳細等を表示
 * @param color サブタイトルの色
 * @returns 
 */

const SubTitle = ({ subTitleName, color = "#000" }) => {
  return (
    <div className="subTitle" style={{ color: color }}>
      {subTitleName}
    </div>
  );
}

export default SubTitle;
