const { Schema, model } = require('mongoose')


const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true, 
      unique: true,
      required: [true, 'Name is required.'],
      trim: true,
    },
    surname: {
      type: String,
      lowercase: true, 
      unique: true,
      required: [true, 'Surname is required.'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      unique: true,
    },

    //chequear el type de la password para que quede seguro!!
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    profileImg: {
      type: String,
        required: [false],
      },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
