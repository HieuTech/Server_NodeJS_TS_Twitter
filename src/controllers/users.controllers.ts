import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

const getUserController = async (req: Request, res: Response) => {
  const { page, limit } = req.query
  const pageNumber = parseInt(page as string)
  const limitUser = parseInt(limit as string)

  try {
    const listUser = await userService.getAllUsers(pageNumber, limitUser)
    res.status(200).json(listUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Something Went Wrong'
    })
  }
}

const loginController = (req: Request, res: Response, next: NextFunction) => {
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

const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const result = await userService.register(req.body)

  return res.status(201).json({
    message: 'Register Success',
    result
  })
}

export { loginController, registerController, getUserController }
