interface AccountVerificationFormat{
    token:string, 
    account: Account
}

interface Account{
    firstname?: string,
    lastname?: string,
    password?: string,
    email?: string
}

export default AccountVerificationFormat