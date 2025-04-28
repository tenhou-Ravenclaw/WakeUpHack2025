import React from 'react';
import SubTitle from '../components/upperBar/SubTitle'; // サブタイトルコンポーネントをインポート
import LoginBody from '../components/bodyContents/pageBody/LoginBody'; // ログインボディコンポーネントをインポート

/**
 * ログインページ
 * @returns 
 */
const Login = () => {
  return (
    <div>
      <SubTitle subTitleName="法人向けログイン" />
      <LoginBody /> {/* ログインの詳細コンテンツを表示 */}
    </div>
  );
};

export default Login;
