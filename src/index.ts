import express, { Router } from 'express'
import { Request, Response } from 'express'
import { query, validationResult } from 'express-validator'
import cors from 'cors'

import 'dotenv/config'
import { errorHandler } from '~/middlewares/errorHandler.middleware'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // Một số trình duyệt cũ (IE11, một số SmartTVs) có thể không hiểu status 204
}
app.use(cors(corsOptions))

//Khi user gửi lên dạng Json, mà trong code ko thể xử lí dạng Json, chỉ xử lí dạng Object, nên phải parse qua Objects
app.use(express.json())
databaseService.connect()

app.use(usersRouter, errorHandler)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server on port ', process.env.SERVER_PORT)
})
