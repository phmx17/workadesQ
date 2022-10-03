// import models 
const User = require('../models/User.js')

// @ desc register new User
// @ route POST /api/v1/users
// @ access public
const registerUser = async(req, res) => {
	const newUser = req.body
	try {
		const createdUser = await User.create(newUser)	// only returns success, no error
		const savedUser = await createdUser.save()
		res.status(200).json({success: true, data: savedUser })
	} catch (err) {	// mostly validation errors caught from User.create
		console.error("catch error message: ", err )
		return res.status(400).json({success: false, data: {
			code: err.code,
			keyValue: err.keyValue
		}})
	}	
}

const validateUser = async(req, res) => {
	let { field, payload } = req.body
	
	if (field === 'username') {
		result = await User.findOne({username: payload})
		if (result) res.status(200).json({message: "username already taken", data: result.username})
		else res.status(200)
	}

	if (field === 'email') {
		result = await User.findOne({email: payload})
		if (result) res.status(200).json({message: "email already taken", data: result.email})
		else { 
			res.status(200)
		}
	}
}

module.exports = { registerUser, validateUser }