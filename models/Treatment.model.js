const { Schema, model } = require('mongoose')


const treatmentSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    exercises: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
    },
    therapeuticTech: {
      type: String,
      required: [true, 'Password is required.'],
    },
    userId: {
    therapistId: String,
        required: [true, 'Id is required'],
      },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Treatment = model('Treatment', treatmentSchema)