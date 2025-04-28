import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 右上表示のボタンパーツ(マイページ以外)
 * @param buttonLabel "一覧に戻る"または"前のページに戻る"が指定される
 * @returns 
 */
const BackPageButton = ({buttonLabel}) => {
  const navigate = useNavigate();

  // 前のページに戻る処理
  const goBack = () => {
    navigate(-1);  // 前のページに戻る
  };

  return (
    <button
      className="backButton"
      id='backPageButton'
      onClick={goBack}
    >
      {buttonLabel}
    </button>
  );
};

export default BackPageButton;
