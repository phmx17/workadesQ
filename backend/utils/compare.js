const bcrypt = require('bcrypt')

module.exports = async (passwordText, passwordHash) => {
  try {
    return bcrypt.compare(passwordText, passwordHash)
  } catch(err) {
      console.log("error in bcrypt compare: ", err)
    return err
  }
}