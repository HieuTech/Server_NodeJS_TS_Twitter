import express from 'express'
import { Request, Response } from 'express'
import 'dotenv/config'

import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()

//Khi user gửi lên dạng Json, mà trong code ko thể xử lí dạng Json, chỉ xử lí dạng Object, nên phải parse qua Objects
app.use(express.json())
databaseService.connect()

app.use(usersRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server on port ', process.env.SERVER_PORT)
})
