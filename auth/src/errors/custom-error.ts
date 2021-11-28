export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    // Just for loggin porpuse
    super(message)
    // Only because we are extending a build in class
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): { message: string; field?: string }[]
}
