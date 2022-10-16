const mongoose = require('mongoose')

// these transactions are store in a collection
// that can be searched by either user or desk in order find a complete history

const checkinSchema = new mongoose.Schema({
  deskId: String,
  userId: String,

  // checkin time
  checkin: {
    type: Date,
    default: Date.now
  },

  // checkout time
  checkout: {
    type: Date,
    default: null
  },
})

module.exports = mongoose.model('Checkin', checkinSchema)