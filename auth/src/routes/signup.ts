import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { BadRequestError, validateRequest } from '@btabtickets/common'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email is in use')
    }

    const user = User.build({
      email,
      password
    })

    await user.save()
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    )

    // Store it on session object
    req.session = {
      jwt: userJwt
    }
    // to extract the jwt
    // https://www.base64decode.org/
    // https://jwt.io/
    // {
    //   "id": "61ad8c0b9a97b17905c6af2d",
    //   "email": "test5@yahoo.com",
    //   "iat": 1638763531
    // }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
