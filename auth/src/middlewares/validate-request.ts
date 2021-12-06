import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ReqesutValidationError } from '../errors/request-validation'

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new ReqesutValidationError(errors.array())
  }

  next()
}
