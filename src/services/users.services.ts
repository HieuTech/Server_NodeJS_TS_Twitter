import { Request, Response } from 'express'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const result = await databaseService.users.insertOne(new User(payload))
    return result
  }
}

const userService = new UsersService()

export default userService
