import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'

const usersRouter = express.Router()
import { loginValidator } from '~/middlewares/users.middleware'
//middleware
// usersRouter.use('/', loginValidator)
usersRouter.get('/user', (req, res) => {
  res.send('this is user routes')
})

usersRouter.post('/login', loginValidator, loginController)

usersRouter.post('/register', registerController)

export default usersRouter
