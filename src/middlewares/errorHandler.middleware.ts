import { Request, Response, NextFunction } from 'express'
import { httpStatus } from '~/constants/HttpStatus'
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.httpStatus || httpStatus.SYSTEM_ERROR).json({
    message: err.message
  })
}
