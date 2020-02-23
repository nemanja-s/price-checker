const nodemailer = require('nodemailer');
const config = require('config');

const user = config.get('gmailAppEmailAddress');
const pass = config.get('gmailAppEmailPassword');
const sendTo = config.get('contactEmailAddress');
const pageUrl = config.get('pageUrl');

module.exports = async price => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });

    let textToSend = 'Price dropped to ' + price;
    let htmlText = pageUrl;

    let info = await transporter.sendMail({
        from: `"Price Checker" <${user}>`,
        to: sendTo,
        subject: 'Price dropped to ' + price,
        text: textToSend,
        html: htmlText
    });

    console.log("Message sent: %s", info.messageId);
};