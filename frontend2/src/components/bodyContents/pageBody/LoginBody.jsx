import "./loginBody.css";

/**
 * ログイン画面の中身を記述
 * @returns
 */

const LoginBody = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理の実行
    //console.log("Username:", username);
    //console.log("Password:", password);
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
          />

          <div style={{ marginTop: '20px' }}></div>

          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="パスワードを入力"
          />
        </div>

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
