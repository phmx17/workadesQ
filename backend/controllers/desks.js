// import models 
const Desk = require('../models/Desk.js')

// @ desc get all desks
// @ route	GET /api/v1/desks
// @ access public
const getDesks = async(req, res) => {
	try {
		const allDesks = await Desk.find()
		res.status(200).json({success: true, data: allDesks })
	} catch (err) {
		console.error("catch error message: ", err )
		res.status(404).json({success: false, data: err})
	}
}

// @ desc create new desk
// @ route	POST /api/v1/desks
// @ access private
const postDesk = async(req, res) => {
	const newDesk = req.body
	try {
		const createdDesk = await Desk.create(newDesk)	// only returns success, no error
		const savedDesk = await createdDesk.save()
		res.status(200).json({success: true, data: savedDesk })
	} catch (err) {	// mostly validation errors caught
		console.error("catch error message: ", err )
		return res.status(400).json({success: false, data: {
			code: err.code,
			keyValue: err.keyValue
		}})
	}	
}

// @ desc update desk
// @ route	PUT /api/v1/desks/:id
// @ access private
const putDesk = async(req, res) => {
	res.send("put desk controller")
}

// @ desc delete desk
// @ route	DELETE /api/v1/desks/:id
// @ access private
const deleteDesk = async(req, res) => {
	res.send("delete Desk controller")
}

module.exports = {
	getDesks, postDesk, putDesk, deleteDesk
}


