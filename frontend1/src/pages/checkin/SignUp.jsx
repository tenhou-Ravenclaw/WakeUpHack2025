'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 画面遷移用

import HeaderComponent from "../../components/Header"

export default function SignUpPage() {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    paymentMethod: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('登録データ', form);
    // 登録成功したら /setcredit に飛ばす
    navigate('/setcredit');
  };

  const handleJoin = () => {
    console.log('入会ボタン押した');
    // ここで入会処理を行う
    const requestData = {
      name: `${form.lastName} ${form.firstName}`,
      birthday: form.birthDate,
      payWay: 1,
      pwd: form.password,
      mailAddress: form.email,
    };

    fetch('http://0.0.0.0:5001/trigger/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    navigate('/login');
  };

  return (
    <>
    <HeaderComponent>
        <img src="SignUp.png" alt="画像エラー" style={{width:"60px"}}/>
        <p style={{ fontSize: '48px' }}>入会</p>
    </HeaderComponent>
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <form onSubmit={handleRegister}>
        <div style={formItemStyle}>
          <label>姓</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>名</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>連絡先（メールアドレス）</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>生年月日</label>
          <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>パスワード</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>パスワード（確認用）</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ marginTop: '20px', marginBottom: '10px', textAlign: 'left' }}>
          <label>支払方法</label>
        </div>

        <button type="submit" style={registerButtonStyle}>
          登録する
        </button>
      </form>

      <div style={{ marginTop: '30px', fontSize: '12px', textAlign: 'center' }}>
        <p>
          私は、「入会」をクリックすることで、<br />
          <a href="https://HomeLink.com/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#000' }}>
            HomeLink.com/terms
          </a>
          に記載の会員規約の内容に同意します
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={handleJoin} style={joinButtonStyle}>
          入会
        </button>
      </div>
    </div>
    </>
  );
}

// 入力欄のスタイル
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const formItemStyle = {
  marginBottom: '15px',
  textAlign: 'left',
};

// 「登録する」ボタンスタイル
const registerButtonStyle = {
  width: '100%',
  backgroundColor: '#1E40AF', // 濃い青
  color: 'white',
  padding: '10px 0',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px',
};

// 「入会」ボタンスタイル
const joinButtonStyle = {
  backgroundColor: '#3B82F6', // 少し明るい青
  color: 'white',
  padding: '10px 40px',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
};
