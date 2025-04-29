import React from 'react';
import ReactDOM from 'react-dom/client';  // 新しいインポート方法
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // createRootを使う
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
