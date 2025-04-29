import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 右上表示のボタンパーツ(マイページ以外)
 * @param {string} buttonLabel - ボタンラベル ("一覧に戻る" または "前のページに戻る")
 * @param {string} [listPath] - 一覧ページへのパス（オプション）
 */
const BackPageButton = ({ buttonLabel, listPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonLabel === "一覧へ戻る" && listPath) {
      navigate(listPath); // 指定された一覧パスへ
    } else {
      navigate(-1); // 前のページへ
    }
  };

  return (
    <button
      className="backButton"
      id="backPageButton"
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  );
};

export default BackPageButton;
