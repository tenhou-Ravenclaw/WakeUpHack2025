import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigateをインポート
import "./loginBody.css";

/**
 * ログイン画面の中身を記述
 * @returns
 */
const LoginBody = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // useNavigateをフックとして呼び出し

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://0.0.0.0:5001/trigger/npo-sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('ログインに失敗しました');
        }
        return response.json();
      })
      .then((data) => {
        // ログイン成功時の処理
        navigate('/mypage'); // ダッシュボードページに遷移
      })
      .catch((error) => {
        // エラーメッセージを設定
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="login-body">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="メールアドレスを入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ marginTop: '20px' }}></div>

          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* ログインボタンを中央に配置するために新しい div を追加 */}
        <div className="login-button-container">
          <button id="loginButton" type="submit">
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginBody;
