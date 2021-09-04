// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

// create env variable
const dotenv = require('dotenv')
dotenv.config()

// init express
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 5000

// init node mailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET,
    }
});

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendEmail', async (req, res) => {
    console.log('Got body:', req.body);
    const {
        from,
        to,
        subject,
        text
    } = req.body
    try {
        const result = await transporter.sendMail({
            from,
            to,
            subject,
            text
        })
        res.send("Send email Successfully")
    } catch (error) {
        throw new Error(error)
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})