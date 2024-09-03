import jwt, { SignOptions } from 'jsonwebtoken'

export const signToken = ({
  payload,
  PRIVATE_KEY = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  PRIVATE_KEY?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, PRIVATE_KEY, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}
