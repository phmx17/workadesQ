const jwt = require('jsonwebtoken')

module.exports = jwtAuthenticator = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({success: false, msg: "No token. Authorization failed"})

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch(err) {res.status(400).json({success: false, msg: "Token is not valid"})}
}