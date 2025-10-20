const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'user@gmail.com',
        pass: 'secret-password'
    }
})

const mailOptions = {
    from: 'user@gmail.com',
    to: 'user@example.com',//, kolejny@example.com
    subject: 'Sending E-mail using Node.js',
    text: 'Easy way to send emails'
    //html: '<h1>Welcome</h1><p>That was easy!</p>'
}
transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Email sent: ${info.response}`)
    }
})