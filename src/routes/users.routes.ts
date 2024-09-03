import express from 'express'
import { query } from 'express-validator'
import { loginController, registerController, getUserController } from '~/controllers/users.controllers'

import { wrapRequestHandler } from '~/utils/requestHandler'

const usersRouter = express.Router()
import { getAllUserPagiValidator, loginValidator, registerValidator } from '~/middlewares/users.middleware'
//middleware
// usersRouter.use('/', loginValidator)

usersRouter.get('/users', getAllUserPagiValidator, getUserController)

usersRouter.post('/login', loginValidator, loginController)

/**
 * Description: Register a new User
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string,
 * confirm_password: string, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
