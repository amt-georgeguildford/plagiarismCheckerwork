interface AccountVerificationFormat{
    token?:string, 
    account: Account
}

interface Account{
    firstname?: string,
    lastname?: string,
    password?: string,
    email?: string
}

enum Role{
    ADMIN= 'ADMIN',
    LECTURER= 'LECTURER',
    STUDENT= 'STUDENT'
}

interface CsvDataType {
    firstname: string, 
    lastname: string, 
    email: string,
    phone_number: string,
    departmentid?: string,
    qualification?: string,
}

interface MailOptions {
    from: string,
    to: string,
    subject: string,
    html: string
}

export  {AccountVerificationFormat, Role, CsvDataType, MailOptions}