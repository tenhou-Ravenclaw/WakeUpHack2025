import React from 'react';

const Hidden = () => {
    const handleClick = () => {
        const data = {
            name:"preNPO", 
            pwd:"password", 
            mailAddress:"test@mail.com"
        };
        fetch('http://0.0.0.0:5001/trigger/npo-sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return (
        <>
            <button onClick={handleClick}>NPOアカウント作成</button>
        </>
    );
};

export default Hidden;