const { Schema, model, Types } = require('mongoose')


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
    frecuency: {
      type: String,  
      required: [true, 'Frequency is required.'],
      trim: true,
    },
    duration: {
      type: String,  
      required:  [true, 'Duration is required.'],
      trim: true,
    },
    comments: {
      type: String, 
      trim: true, 
    },
    therapeuticTech: {
      type: String,
      required:  [false],
      trim: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Treatment = model('Treatment', treatmentSchema)

module.exports = Treatment;