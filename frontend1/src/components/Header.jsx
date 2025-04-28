import React from 'react';

const HeaderComponent = ({ children }) => {
    const headerStyle = {
        width: '100%',
        height: '120px',
        backgroundColor: '#F9A5B2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    };

    return <header style={headerStyle}>{children}</header>;
};

export default HeaderComponent;
