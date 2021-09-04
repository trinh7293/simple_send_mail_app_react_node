import axios from "axios";

export async function sendMailApi(data) {
    const {
        senderName,
        senderEmail
    } = data
    const from = senderName ? `${senderName} <${senderEmail}>` : senderEmail
    const {
        recipientEmail: to,
        subject: subject,
        message: text
    } = data
    const result = await axios.post('post-test', {
        from,
        to,
        subject,
        text
    })
}