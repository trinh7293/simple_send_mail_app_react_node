const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET,
    }
});

async function run() {
    const result = await transporter.sendMail({
        from: 'from_address@example.com',
        to: 'trinh7293@gmail.com',
        subject: 'Test Email Subject',
        text: 'Example Plain Text Message Body'
    })
    console.log(result)
}

run()