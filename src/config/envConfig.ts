import dotenv from 'dotenv'
dotenv.config()

const envConfig={
    PORT: process.env["PORT"],
    accessTokenSecret: process.env["ADMIN_ACCESS_TOKEN_SECRET"],
    refreshTokenSecret: process.env["ADMIN_REFRESH_TOKEN_SECRET"],

    accessTokenDuration: process.env["ACCESS_TOKEN_DURATION"],
    refreshTokenDuration: process.env["REFRESH_TOKEN_DURATION"],

    email: process.env["EMAIL"],
    emailPassword: process.env["EMAIL_PASSWORD"],

    accountVerificationSesssionSecret: process.env["ACCOUNT_VERIFICATION_SECRET"],
    accountVerificationSessionDuration: process.env["ACCOUNT_VERFICATION_DURATION"],

    salt: process.env["SALT"],

    frontendLogin: process.env["FRONTEND_URL"]+"login",
    frontendReset: "http://localhost:5173/reset"
}

const ROLE={
    ADMIN: 'ADMIN',
    STUDENT: "STUDENT",
    LECTURER: "LECTURER"
}
export {ROLE}
export default envConfig;