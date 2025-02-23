const nodemailer = require("nodemailer");

const { GMAIL_EMAIL, GMAIL_PASS, GMAIL_EMAIL_SERVICE } = require('./server-config');

const mailsender = nodemailer.createTransport({
    service: GMAIL_EMAIL_SERVICE,
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASS
    }
});

module.exports = mailsender;