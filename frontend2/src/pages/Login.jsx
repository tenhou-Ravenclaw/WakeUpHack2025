import React from 'react';
import LoginBody from '../components/bodyContents/pageBody/LoginBody';
import SubTitle from '../components/upperBar/SubTitle';

/**
 * ログインページ
 * @returns 
 */
const Login = () => {
  return (
    <div>
      <SubTitle subTitleName={"法人向けログイン"}/>
      <LoginBody />
    </div>
  );
};

export default Login;
