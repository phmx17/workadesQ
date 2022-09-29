// create connection with current options to avoid depracation warnings
const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.ATLAS_CONNECTION, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
    console.log("Mongo DB Atlas connection secured")
} catch(err) {
    console.log("Atals connection failure")
    process.exit(1)
}
