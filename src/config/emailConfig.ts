import nodemailer from "nodemailer"
import envConfig from "./envConfig"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: envConfig.email,
        pass: envConfig.emailPassword
    }
})

export default transport