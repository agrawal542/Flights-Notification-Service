const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SEND_EMAIL: process.env.SEND_EMAIL,
    GMAIL_EMAIL_SERVICE: process.env.GMAIL_EMAIL_SERVICE
}