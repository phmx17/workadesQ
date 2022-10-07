const jwt = require('jsonwebtoken')

module.exports = async (user) => {
  try {
    return await jwt.sign(
      { data: {id: user.id, username: user.username } }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2d' }
    )
  } catch(err) {
    console.log("error with signing jwt: ", err)
    return
  }
}