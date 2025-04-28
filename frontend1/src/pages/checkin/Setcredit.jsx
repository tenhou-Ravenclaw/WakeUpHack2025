'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← 追加！

export default function CreditCardForm() {
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const navigate = useNavigate(); // ← ここも追加！

  const handleChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('カード情報保存', cardInfo);
    // 保存したら /signup へ移動
    navigate('/signup');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      
      {/* 左側フォーム */}
      <form onSubmit={handleSave} style={{ flex: 1, minWidth: '300px', marginRight: '30px' }}>
        <div style={formItemStyle}>
          <label>1 クレジットカード番号</label>
          <input type="text" name="number" value={cardInfo.number} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>2 名前</label>
          <input type="text" name="name" value={cardInfo.name} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={formItemStyle}>
          <label>3 有効期限</label>
          <input type="text" name="expiry" value={cardInfo.expiry} onChange={handleChange} style={inputStyle} placeholder="MM/YY" />
        </div>

        <div style={formItemStyle}>
          <label>4 セキュリティーコード</label>
          <input type="text" name="cvc" value={cardInfo.cvc} onChange={handleChange} style={inputStyle} />
        </div>

        <button type="submit" style={saveButtonStyle}>
          保存する
        </button>

        {/* 鍵マークと説明 */}
        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', fontSize: '12px', color: '#555' }}>
          <img src="/lock.png" alt="Lock Icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          <span>お客様の情報は安全に保護されています</span>
        </div>
      </form>

      {/* 右側クレカ画像 */}
      <div style={{ flex: 1, minWidth: '300px', textAlign: 'center', marginTop: '20px' }}>
        <img src="/card.png" alt="Credit Card" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
      </div>
    </div>
  );
}

// スタイルまとめ

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

const saveButtonStyle = {
  width: '100%',
  backgroundColor: '#1E40AF',
  color: 'white',
  padding: '10px 0',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px',
};
