import { Request, Response, NextFunction } from 'express'
import { checkSchema, query, validationResult } from 'express-validator'
import { httpStatus } from '~/constants/HttpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

const getAllUserPagiValidator = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query
  if (!page || !limit) {
    return res.status(400).json({
      message: 'Page and limit is required'
    })
  }
  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return res.status(400).json({
      message: 'Page and limit must be number'
    })
  }

  next()
}

const loginValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'email is not empty'
    },
    trim: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    },
    custom: {
      options: async (value) => {
        const isEmailExist = await databaseService.users.findOne({ email: value })
        if (!isEmailExist) {
          throw new ErrorWithStatus({ message: 'You need to login first', status: httpStatus.BAD_REQUEST })
        }
      }
    }
  },
  password: {
    isLength: {
      options: { min: 6 },

      errorMessage: {
        message: 'Password Must at least 6 characters long',
        status: 402
      }
    }
  }
})

const registerValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'email is not empty'
    },
    trim: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    },
    custom: {
      options: async (value) => {
        const isEmailExist = await userService.checkEmailExist(value)
        if (isEmailExist) {
          throw new ErrorWithStatus({ message: 'Email Is Exist', status: httpStatus.BAD_REQUEST })
        }
      }
    }
  },
  password: {
    isLength: {
      options: { min: 6 },

      errorMessage: {
        message: 'Password Must at least 6 characters long',
        status: 402
      }
    }
  },
  confirm_password: {
    custom: {
      options: (value, { req }) => value === req.body.password,
      errorMessage: {
        message: 'password do not match',
        status: 402
      }
    }
  }
})

export { loginValidator, registerValidator, getAllUserPagiValidator }
