declare global{
    namespace Express{
        interface Request{
            account: {
                id?: string,
                email?: string
                password?: string
                firstname?: string
                lastname?: string
            },
            payload: {
                id: string,
                email: string,
                role: 'ADMIN' | 'STAFF' | 'STUDENT'
            },

            accessToken: string,
            refreshToken: string,
            accountVerificationSession: string

            hashPassword: string

            accountFound: boolean
            isverified: boolean
            accessTokenExpired: boolean
            refreshTokenExpired: boolean
            mailSessionExpired: boolean
        }
    }
}

export {}