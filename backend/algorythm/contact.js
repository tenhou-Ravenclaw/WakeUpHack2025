const nodemailer = require('nodemailer');
const { getOwner } = require('../dao/ownerTable');

async function contactOwner(ownerId, subject, message) { //引数(ユーザーid,メッセージ)
    // オーナーと連絡を取る
    const to = await getOwner(ownerId).mailAdress
    sendMail(to,subject,message);
}

function contactNPO(NPOId, subject, message) {
    const to = getNPOData(NPOId)
    sendMail(to,subject,message);
}

async function contactOwnerForWorkBuild(buildId,mattchWorksearcher) {
    // 人の許可についてオーナーに連絡を取る
    // params{
    //     buildId:int,
    //     mattchWorksearcher:jobSercherId(int)[]
    //     }
    // メールを送信
    let message = "物件の担当者が決まりました。以下が一覧です。\n";
    mattchWorksearcher.forEach(async jobSercherId => {
        const name = await getJobSearcher(jobSercherId);
        message += `${name}\n`;
    });
    message += `以上,${mattchWorksearcher.length}人です。`;
    const ownerId = getBuildData(buildId).ownerId
    contactOwner(ownerId,"物件の担当者確定のお知らせ",message)
}

function contactNPOForWorkBuild(buildId,mattchWorksearcher) {
    // 人の許可についてNPOに連絡を取る
        // params{
    //     buildId:int,
    //     mattchWorksearcher:jobSercherId(int)[]
    //     }
    // メールを送信
    let message = "物件の担当者が決まりました。以下が一覧です。\n";
    let NPOId = -1;
    mattchWorksearcher.forEach(async jobSercherId => {
        const jobSearcher = await getJobSearcher(jobSercherId);
        if (NPOId == -1) {
            jobSearcher.NPOId;
        }
        const name = jobSearcher.name;
        message += `${name}\n`;
    });
    message += `以上,${mattchWorksearcher.length}人です。`;
    contactNPO(NPOId,"物件の担当者確定のお知らせ",message)
}

function notificationDeleteBuildDate(buildId) {
    // 建物が削除された通知
}

async function sendMail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'process.env.EMAIL_USER',
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