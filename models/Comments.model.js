const { Schema, model, Types } = require('mongoose')


const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required.'],
      trim: true,
    },
    treatment: {
      type: Types.ObjectId,
      ref: 'Treatment',
      required: true,
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

const Comment = model('comment', commentSchema);

module.exports = Comment;