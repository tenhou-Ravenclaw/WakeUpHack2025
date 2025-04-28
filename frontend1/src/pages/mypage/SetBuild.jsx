import React from 'react';
import HeaderComponent from "../../components/Header"

const TextInputBox = ({ label }) => {
    const labelStyle = {
        fontSize: "32px",
        marginLeft: "50px"
    };
    const inputStyle = {
        width: "40vw",
        marginLeft: "50vw",
        position: "fixed",
        background: "#CDDEBC",
        border: "1px solid gray"
    }

    // children 要素 (input) に id を設定
    const id = label.replace(/\s+/g, '').toLowerCase(); // ラベルをIDに変換（空白を削除）

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor={id} style={labelStyle}>
                {label}
            </label>
            <input type="text" style={inputStyle}/>
        </div>
    );
};

const NumberInputBox = ({ label }) => {
    const labelStyle = {
        fontSize: "32px",
        marginLeft: "50px"
    };
    const inputStyle = {
        width: "40vw",
        marginLeft: "50vw",
        position: "fixed",
        background: "#CDDEBC",
        border: "1px solid gray"
    }

    // children 要素 (input) に id を設定
    const id = label.replace(/\s+/g, '').toLowerCase(); // ラベルをIDに変換（空白を削除）

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor={id} style={labelStyle}>
                {label}
            </label>
            <input type="number" style={inputStyle}/>
        </div>
    );
};
const ImageInputBox = ({ label }) => {
    const labelStyle = {
        fontSize: "32px",
        marginLeft: "50px"
    };
    const inputStyle = {
        marginLeft: "50vw",
        position: "fixed",
        background: "#CDDEBC",
        border: "1px solid gray"
    }

    // children 要素 (input) に id を設定
    const id = label.replace(/\s+/g, '').toLowerCase(); // ラベルをIDに変換（空白を削除）

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor={id} style={labelStyle}>
                {label}
            </label>
            <input type="file" accept="image/*" style={inputStyle}/>
        </div>
    );
}

const SetBuildButton = ({ children }) => {
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

const SetBuild = () => {
    const imgStyle = {
        width: '60px'
    };
    const titleStyle = {
        fontSize: '48px'
    };

    return (
        <div>
            <HeaderComponent>
                <img src="/SetBuild.png" alt="画像エラー" style={imgStyle} />
                <p style={titleStyle}>物件を登録</p>
            </HeaderComponent>
            <form>
                <TextInputBox label="物件の位置"/>
                <TextInputBox label="物件の延べ大きさ"/>
                <NumberInputBox label="部屋の数"/>
                <NumberInputBox label="掃除の頻度(月何回)"/>
                <NumberInputBox label="放置時間(月)"/>
                <ImageInputBox label="物件の画像"/>
                <ImageInputBox label="権利書のアップロード"/>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <label style={{ fontSize: "32px", marginLeft: "50px" }}>売却意思があるか</label>
                    <div style={{ marginLeft: "50vw", position: "fixed" }}>
                        <label style={{ marginRight: "20px" }}>
                            <input type="radio" name="sellIntent" value="yes" />
                            はい
                        </label>
                        <label>
                            <input type="radio" name="sellIntent" value="no" />
                            いいえ
                        </label>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                    <SetBuildButton>登録</SetBuildButton>
                    <SetBuildButton>キャンセル</SetBuildButton>
                </div>
            </form>
        </div>
    );
};

export default SetBuild;
