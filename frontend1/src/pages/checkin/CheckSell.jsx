import React from 'react';
import HeaderComponent from "../../components/Header";

const TextBox = ({ label, text }) => {
    const textStyle = {
        color: "#000",
        fontFamily: "Inter",
        fontSize: "3rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
        marginLeft: "50px"
    };

    const borderStyle = {
        minWidth: "500px",
        border: "4.5px solid rgba(110, 184, 133, 0.60)", // ← ここ重要！
        padding: "10px 20px",
        marginLeft: "50px",
        borderRadius: "8px",
        backgroundColor: "#FFF",
        boxShadow: "0px 4px 4px rgba(0, 173, 173, 0.25)",
        display: "flex",
        alignItems: "center",
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={textStyle}>{label}</p>
            <div style={borderStyle}>
                <p style={{ ...textStyle, margin: 0 }}>{text}</p> {/* 内側の文字には margin をリセット */}
            </div>
        </div>
    );
};

const CheckSellButton = ({ children }) => {
    const buttonStyle = {
        borderRadius: "20px",
        background: "#261CEA",
        width: "255px",
        height: "54px",
        flexShrink: 0,
        color: "white",
        border: "none",
        cursor: "pointer",
        fontFamily: "Inter",
        fontSize: "32px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        margin: "auto"
    };

    return (
        <button style={buttonStyle}>
            {children}
        </button>
    );
}

const CheckSell = () => {
    return (
        <div>
            <HeaderComponent>
                <img src="/CheckSell.png" alt="画像エラー" style={{ width: '60px' }} />
                <p style={{ fontSize: '48px' }}>売却意思の確認</p>
            </HeaderComponent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>東京都新宿区の家</h1>
                <TextBox label="希望者名" text="?" />
                <TextBox label="希望価格" text="?" />
                <TextBox label="売却意思" text="?" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '50px', width: '100%' }}>
                <CheckSellButton>許可する</CheckSellButton>
                <CheckSellButton>許可しない</CheckSellButton>
            </div>
            <br />
        </div>
    );
}

export default CheckSell;
