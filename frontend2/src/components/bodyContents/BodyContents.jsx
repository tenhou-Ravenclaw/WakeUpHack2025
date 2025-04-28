import React from 'react';
import "./bodyContents.css";

/**
 * UpperBarに干渉しないようにするためのBody
 * @param {JSX.Element} pagebody 渡されたJSXコンテンツ
 * @returns 
 */
const BodyContents = ({ pagebody }) => {
  return (
    <div className="bodyContents">
      {pagebody} {/* 渡されたJSXを表示 */}
      {/* 他のコンテンツやコンポーネントを追加 */}
    </div>
  );
};

export default BodyContents;
