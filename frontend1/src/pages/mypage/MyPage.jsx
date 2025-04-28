import React from 'react';
import HeaderComponent from "../../components/Header"

const MyPageButtom = ({children}) => {
    const style = {
        display: 'flex',
        width: '852px',
        height: '94px',
        padding: '8px 264px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexShrink: '0',
        'border-radius': '1.25rem',
        border: '4.5px solid rgba(110, 184, 133, 0.60)',
        background: '#FFF',
        'box-shadow': '0px 4px 4px 0px rgba(0, 173, 173, 0.25)',
        fontSize: '48px',
        whiteSpace: 'nowrap', // Prevent text wrapping
        margin: '30px'
    }
    return <button style={style}>{children}</button>
}

const MyPage = () => {
    const imgStyle = {
        width:'60px'
    }
    const titleStyle = {
        fontSize: '48px'
    }
    const mainStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '40px',
        height: 'auto'
    }
    return (
        <div style={{ margin: 0, padding: 0 }}>
            <HeaderComponent>
                <img src="/MyPage.png" alt="画像エラー" style={imgStyle}/>
                <p style={titleStyle}>マイページ</p>
            </HeaderComponent>
            <main style={mainStyle}>
                <MyPageButtom>報告書の確認</MyPageButtom>
                <MyPageButtom>物件の登録</MyPageButtom>
                <MyPageButtom>登録物件の変更</MyPageButtom>
                <MyPageButtom>アカウント情報の変更</MyPageButtom>
            </main>
        </div>
    );
};

export default MyPage;