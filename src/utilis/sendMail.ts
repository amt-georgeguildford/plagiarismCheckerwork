import transport from "../config/emailConfig" 
import { MailOptions } from "./types"

const sendEmail = async (mailOptions: MailOptions) => {
    try {
        const info = await transport.sendMail(mailOptions)
        console.log(info.response)
    } catch (err) {
        console.log(err)
    }
}

export { sendEmail }