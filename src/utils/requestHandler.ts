import { RequestHandler } from 'express'

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: any, res: any, next: any) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
