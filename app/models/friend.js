const mongoose = require('mongoose')

const User = require('./../models/user')


const Schema = mongoose.Schema

const friendSchema = new Schema(
  {
    location: {
        type:String,
        required: true,
        owner: { type: Schema.Types.ObjectId, ref: 'User' }
    },
  },
  {
    timestamps: true
  }
)

module.exports = friendSchema
