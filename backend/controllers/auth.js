// import models 
const User = require('../models/User.js')

// @ desc register new User
// @ route	POST /api/v1/auth
// @ access public
const registerUser = async(req, res) => {
	const newUser = req.body
	try {
		const createdUser = await User.create(newUser)	// only returns success, no error
		const savedUser = await createdUser.save()
		res.status(200).json({success: true, data: savedUser })
	} catch (err) {	// mostly validation errors caught
		console.error("catch error message: ", err )
		return res.status(400).json({success: false, data: err.errors})
	}	
}

// @ desc update user
// @ route	PUT /api/v1/auth/:id
// @ access private
const updateUser = async(req, res) => {
	res.send("put user controller")
}

// @ desc delete user
// @ route	DELETE /api/v1/auth/:id
// @ access private
const deleteUser= async(req, res) => {
	res.send("delete User controller")
}

module.exports = {
	registerUser, updateUser, deleteUser
}