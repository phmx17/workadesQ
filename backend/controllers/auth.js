// import models 
const User = require('../models/User.js')
const jwt = require()

// @ desc register new User
// @ route	POST /api/v1/auth
// @ access public
const registerUser = async(req, res) => {
	const newUser = req.body
	try {
		const createdUser = await User.create(newUser)	// only returns success, no error
		const savedUser = await createdUser.save()
		res.status(200).json({success: true, data: savedUser })
	} catch (err) {	// mostly validation errors caught from User.create
		console.error("catch error message: ", err )
		return res.status(400).json({success: false, data: err.errors})
	}	
}

// @ desc login
// @ route POST /api/v1/auth/:id
// @ access public
const updateUser = async(req, res) => {
	res.send("logout")
}

// @ desc logout
// @ route	POST /api/v1/auth/:id
// @ access private
const deleteUser= async(req, res) => {
	res.send("logout")
}

module.exports = {
	registerUser, updateUser, deleteUser
}