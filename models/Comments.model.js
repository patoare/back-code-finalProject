const { Schema, model } = require('mongoose')


const commentSchema = new Schema(
  {
    Comments: {
      type: String,
      required: [true, 'Comments are required.'],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, 'Id is required.'],
      trim: true,
    },
    treatmentId: {
      type: String,
      required: [true, 'Id is required.'],
    },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Comment = model('comment', commentSchema)