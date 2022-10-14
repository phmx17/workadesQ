const signJwt = require('../utils/signJwt')
const User = require('../models/User.js')
const comparePasswords = require('../utils/compare.js')


// @ desc login
// @ route	POST /api/v1/auth/login
// @ access public
const login = async(req, res) => {
	const { email, password } = req.body
	try {
		const foundUser = await User.find({email: email})	// returns an array!	
		if (foundUser.length <= 0) return res.status(404).json({success: false, errMsg: "Invalid credentials"})

		const passwordMatch = await comparePasswords(password, foundUser[0].password)
		if (!passwordMatch) return res.status(404).json({success: false, errMsg: "Invalid credentials"})

		// login success, sign jwt
		const jwt = await signJwt({username: foundUser[0].username, id: foundUser[0].id})
		// return user incl. jwt
		res
		// this header block has to be send in the custom inline middleware in server.js; it does not work here!
		// .header({
		// 	'Access-Control-Allow-Origin': 'http://localhost:8080',
		// 	'Access-Control-Allow-Credentials': 'true',
		// 	"Access-Control-Allow-Headers": "Content-Type"
		// })			
			.status(200)
			.cookie('jwToken', jwt )
			.json({success: true, data: 
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

