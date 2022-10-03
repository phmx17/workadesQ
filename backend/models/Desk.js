const mongoose = require('mongoose')

const deskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

	location: {
		type: {
			type: String, 
			enum: ['Point'], 
	  },
		coordinates: {
			type: [Number],
			index: '2d-sphere'
	  },
	 	formattedAddress: {type: String, required: true, unique: [true, "needs to be unique"]}
	},

  features: {
    desk: Boolean, wifi: Boolean, power: Boolean, coffee: Boolean, wc: Boolean
  },

  daysClosed: [
  	{day: { type: String }, closed: {type: Boolean}}
  ],

  weekdayHours: [],
  weekendHours: [],

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Desk', deskSchema)




    




