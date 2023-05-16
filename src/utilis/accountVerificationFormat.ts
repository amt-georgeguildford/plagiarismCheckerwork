import envConfig from "../config/envConfig"
import AccountVerificationFormat from "./types"
const accountVerificationFormat= ({token, account}: AccountVerificationFormat)=>{
    return {
        from: `Admin <${envConfig.email}>`,
        to: `${account.firstname} <${account.email}>`,
        subject: "Account Verification",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Mohave&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
            <title>Document</title>
        </head>
        <body style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
            <div style="position: absolute; width: 456px;  padding: 16px 48px;
            margin:0 auto; display: flex; flex-direction: column; align-items: center; justify-content:flex-start; background-color: white;
            box-shadow: 1px 1px 10px grey; border-radius: 8px;">
                <p style="font-family: Mohave; font-weight: 400; 
                font-size: 48px; margin-top: 0; 
                color: #49605A;">P.Net</p>
                <div style="font-family: Poppins; 
                 font-size: 16px; font-weight: 400; line-height: 24px;
                 color: #252525;">
                <div>
                    <p>Dear ${account.firstname},</p>
                    <p>&nbsp; &nbsp; &nbsp; Your account is now active. Login with the following credentials to get started:</p>
        <p>Username: ${account.email}<br> Password: ${account.password}</p>
        After logging in, please create a new password. If you need any assistance, feel free to contact us at [Insert Contact Details].<br>
        <p>Thank you!<br>
            Best regards, Admin <br></p>
        </div>
            <a href="google.com/${token}" style="font-size: 16px; border: 1px; background-color: #3C5148; color: #ffffff; border-radius: 8px; padding: 12px; width: 100%; margin: 54px 0 16px 0; text-decoration: none; display: block; text-align: center;">Log in</a>
        </div>
            
        </body>
        </html>`
    }
}

export default accountVerificationFormat