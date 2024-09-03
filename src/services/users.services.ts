import { Request, Response } from 'express'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRED
      }
    })
  }

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit
    const users = await databaseService.users.find({}, { skip, limit }).toArray()
    return users
  }

  async register(payload: RegisterReqBody) {
    // const userExist = await databaseService.users.findOne({ email: payload.email })
    // if (userExist) {
    //   return null
    // }

    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const user_id = result.insertedId.toString()
    //Xu li bat dong bo tối ưu hóa performance
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string) {
    const userExist = await databaseService.users.findOne({ email: email })

    return Boolean(userExist)
  }
}

const userService = new UsersService()

export default userService
