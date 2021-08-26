const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    location: {
        type: String,
        required: true
    },
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Friend',friendSchema)
