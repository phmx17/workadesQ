const signJwt = require('../utils/signJwt')
const User = require('../models/User.js')
const comparePasswords = require('../utils/compare.js')


// @ desc login
// @ route	POST /api/v1/auth/login
// @ access public
const login = async(req, res) => {
	const userLogin = req.body
	try {
		const foundUser = await User.find({email: userLogin.email})	// returns an array!	
		if (foundUser.length <= 0) return res.status(404).json({success: false, errMsg: "Invalid credentials"})

		const passwordMatch = await comparePasswords(userLogin.password, foundUser[0].password)
		if (!passwordMatch) return res.status(404).json({success: false, errMsg: "Invalid credentials"})

		// login success, sign jwt
		const jwt = await signJwt({username: foundUser[0].username, id: foundUser[0].id})
		// return user incl. jwt
		res.status(200).json({success: true, data: 
			{ username: foundUser[0].username, id: foundUser[0].id, jwt }
			})
	} catch (err) {res.status(404).json({ success: false, data: err })}	
}

// @ desc logout
// @ route	POST /api/v1/auth/logout
// @ access private
const logout= async(req, res) => {
	res.send("logout")
}

module.exports = {
	login, logout
}