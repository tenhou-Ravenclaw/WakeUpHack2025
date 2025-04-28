//import React, { useState } from 'react';
import UpperBar from './components/upperBar/UpperBar';  // UpperBarをインポート
import BodyContents from './components/bodyContents/BodyContents';  // BodyContentsをインポート

// React Router DOMをインポート（ページ遷移用）
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login'; // ログインページのインポート
import MyPage from './pages/MyPage';

const App = () => {
  //const [buttonLabel, setButtonLabel] = useState('戻る');

  return (
    //<Login/>
    <MyPage/>
  );
};

export default App;
