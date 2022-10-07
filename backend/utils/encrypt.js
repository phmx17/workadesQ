const bcrypt = require('bcrypt')

module.exports = async (passwordText) => {
  try {
    const saltRounds = 10
    return await bcrypt.hash(passwordText, saltRounds)
  } catch(err) {
    console.log("error in bcrypt encryption attempt", err)
    return
  }
}
