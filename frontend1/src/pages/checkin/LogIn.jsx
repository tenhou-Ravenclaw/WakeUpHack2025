'use client';

import HeaderComponent from "../../components/Header"


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ログインデータ', form);
    // ここでログイン処理を行う    
    fetch('http://0.0.0.0:5001/trigger/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error('ログインに失敗しました');
      }
      return response.json();
      })
      .then((data) => {
      console.log('ログイン成功:', data);
      navigate('/mypage');
      })
      .catch((error) => {
      console.error('エラー:', error);
      alert('ログインに失敗しました。もう一度お試しください。');
      });
    // e.preventDefault();
    // console.log('ログインデータ', form);
    // // ここでログイン処理が成功したらマイページへ遷移
    // navigate('/mypage');
  };
  

  return (
    <>
    <HeaderComponent>
        <img src="LogIn.png" alt="画像エラー" style={{width:"60px"}}/>
        <p style={{ fontSize: '48px' }}>ログイン</p>
    </HeaderComponent>
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      
      {/* オーナー様タイトル */}
      <h2 style={titleStyle}>オーナー様</h2>
      <div style={titleUnderlineStyle}></div>

      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={loginButtonStyle}>
          ログイン
        </button>
      </form>

      {/* 新しく入会する */}
      <div style={{ marginTop: '16px' }}>
        <a href="/signup" style={signupLinkStyle}>
          新しく入会する
        </a>
      </div>

      {/* 利用規約・プライバシーポリシーリンク */}
      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <a href="#" onClick={() => setShowTerms(true)} style={policyLinkStyle}>
          利用規約
        </a>
        <span style={{ margin: '0 20px' }}></span>
        <a href="#" onClick={() => setShowPrivacy(true)} style={policyLinkStyle}>
          プライバシーポリシー
        </a>
      </div>

      {/* 利用規約ポップアップ */}
      {showTerms && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <p>1. 本サービスについて<br />本アプリ「Minaie」は、空き家の登録管理、マッチング、清掃報告の確認などを提供します。</p>
            <p>2. 利用者の責任<br />利用者は、正確な情報を登録し、法令を守って利用してください。</p>
            <p>3. 免責事項<br />本アプリはマッチング結果や物件取引について、当社は一切責任を負いません。</p>
            <button onClick={() => setShowTerms(false)} style={closeButtonStyle}>閉じる</button>
          </div>
        </div>
      )}

      {/* プライバシーポリシーポップアップ */}
      {showPrivacy && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <p>1. 個人情報の取り扱い<br />このアプリは取得情報を第三者に提供しません。</p>
            <p>2. 個人情報の開示・訂正・削除<br />本人からの請求に応じて、自己の個人情報の開示・訂正・追加・削除・利用停止を適切に対応します。</p>
            <button onClick={() => setShowPrivacy(false)} style={closeButtonStyle}>閉じる</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

// スタイルまとめ

const titleStyle = {
  color: '#000',
  fontFamily: 'Inter',
  fontSize: '48px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  marginBottom: '10px',
};

const titleUnderlineStyle = {
  width: '290px',
  height: '2px',
  backgroundColor: '#EAE8EC',
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const loginButtonStyle = {
  width: '100%',
  backgroundColor: '#3B82F6',
  color: 'white',
  padding: '10px 0',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
};

const signupLinkStyle = {
  color: '#261CEA',
  fontFamily: 'Inter',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textDecorationLine: 'underline',
  textDecorationStyle: 'solid',
  textDecorationSkipInk: 'auto',
  textDecorationThickness: 'auto',
  textUnderlineOffset: 'auto',
  textUnderlinePosition: 'from-font',
};

const policyLinkStyle = {
  color: '#261CEA',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textDecorationLine: 'underline',
  textDecorationStyle: 'solid',
  textDecorationSkipInk: 'auto',
  textDecorationThickness: 'auto',
  textUnderlineOffset: 'auto',
  textUnderlinePosition: 'from-font',
};

const popupStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: '#eee',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  textAlign: 'center',
};

const closeButtonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#3B82F6',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
};
