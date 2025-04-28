import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * マイページに帰るボタン
 * @returns 
 */
const BackToMyPageButton = () => {
  const navigate = useNavigate();

  // マイページに戻る処理
  const goBackToMyPage = () => {
    navigate('/mypage');  // マイページに遷移
  };

  return (
    <button
      className="backButton"
      id="backToMyPagebutton"
      onClick={goBackToMyPage}
    >
      マイページに戻る
    </button>
  );
};

export default BackToMyPageButton;
