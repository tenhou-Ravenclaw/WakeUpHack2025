const nodemailer = require('nodemailer');

function contactOwner(params) { //引数(ユーザーid,メッセージ)
    // オーナーと連絡を取る
}

function contactNPO(params) {

}

function contactOwnerForWorkBuild(params) {
    // 人の許可についてオーナーに連絡を取る
    // params{
    //     buildId:int,
    //     mattchWorksearcher:jobSercherId(int)[]
    //     }
    // メールを送信
    sendMail()
}

function contactNPOForWorkBuild(params) {
    // 人の許可についてNPOに連絡を取る
        // params{
    //     buildId:int,
    //     mattchWorksearcher:jobSercherId(int)[]
    //     }
    // メールを送信
}

function notificationDeleteBuildDate(buildId) {
    // 建物が削除された通知
}

async function sendMail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // あなたのメールアドレス TODO .envの実装
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}