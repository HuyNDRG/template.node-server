export const encodeBase64 = (value) => Buffer.from(value).toString('base64')
export const decodeBase64 = (value) => Buffer.from(value, 'base64').toString('ascii')
