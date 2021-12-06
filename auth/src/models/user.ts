import mongoose from 'mongoose'
import { Password } from '../services/password'

// An interface that describes the properties that are required to create a new user
// (What it take to create a user)
interface UserAttrs {
  email: string
  password: string
}

// An interface that describe the properties that User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties that user document has
// (What Propertues a single user have)
interface UserDoc extends mongoose.Document {
  email: string
  password: string
  // createdAt: string
  // updateAt: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function (done) {
  // if only password is modified not the email
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
