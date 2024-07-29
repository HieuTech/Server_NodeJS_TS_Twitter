import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

const loginController = (req: Request, res: Response) => {
  console.log('req.body', req.body)
  const { email, password } = req.body
  if (email === 'hieu' && password === '123') {
    return res.status(200).json({
      message: 'Success'
    })
  }
  return res.status(401).json({
    message: 'Authenticate Failed'
  })
}

const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
    return res.status(201).json({
      message: 'Register Success',
      result
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error
    })
  }
}

export { loginController, registerController }
