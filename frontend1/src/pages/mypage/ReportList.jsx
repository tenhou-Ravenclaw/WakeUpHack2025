import React from 'react';
import HeaderComponent from "../../components/Header"

const ReportList = () => {
    const mainStyle = { 
        display: 'flex', 
        height: '100vh' 
    }
    const listStyle = { 
        flex: 1, 
        overflowY: 'auto', 
        borderRight: '1px solid #ccc', 
        padding: '10px' 
    }
    const reportStyle = { 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const reportImageStyle = {
        width: '80%',
        border: '1px solid #ccc',
        padding: '10px'
    }
    return (
        <div>
            <HeaderComponent>
                <img src="/ReportList.png" alt="画像エラー" style={{ width: '60px' }}/>
                <p style={{ fontSize: '48px' }}>報告書の確認</p>
            </HeaderComponent>
            <div style={mainStyle}>
                <div style={listStyle}>
                    <h2>Report List</h2>
                    <ul>
                        <li>Report 1</li>
                        <li>Report 2</li>
                        <li>Report 3</li>
                    </ul>
                </div>
                <div style={reportStyle}>
                    <img src="https://via.placeholder.com/300" alt="Report Preview" style={reportImageStyle}/>
                </div>
            </div>
        </div>
    );
};

export default ReportList;