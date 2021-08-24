const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
	{
		location: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Location', locationSchema)
