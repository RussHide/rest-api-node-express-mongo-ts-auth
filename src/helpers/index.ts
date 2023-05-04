import crypto from 'crypto'

const secret = 'HIDE-REST-API'

export const random = () => crypto.randomBytes(120).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex')
}