// import models 
const Desk = require('../models/Desk.js')
const Checkin = require('../models/Checkin.js')
const { updateOne } = require('../models/Desk.js')

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

// @ desc check in at desk location
// @ route	POST /api/v1/desks/checkin
// @ access private
const checkin = async(req, res) => {
	const { userId, deskId } = req.body

	// check user out of any location where she may still be checked in
	Checkin.findOne({userId, checkout: null}, async(err, checkin) => {
		if (err) return res.status(404).json({ success: false, err})
		if (checkin) {  // if block required since checkin could be null
			checkin.checkout = Date.now()
			try {
				await checkin.save()	
			} catch (err) {console.log("error saving to DB: ", err)}
		}
	})

	// create new checkin
	try {
		const checkin = await Checkin.create({ userId, deskId })
		res.status(200).json({success: true, data: checkin})
	}	catch (err) {
		console.log("error creating new checkin to DB: ", err)
		res.status(404).json({success: false, err: err})
	}
}


// @ desc check out at desk location
// @ route	POST /api/v1/desks/checkin
// @ access private
const checkout = async(req, res) => {
	const { userId } = req.body

	// check user out of any location where she may still be checked in
	Checkin.findOne({userId, checkout: null}, async(err, checkin) => {
		if (err) return res.status(404).json({ success: false, err})
		if (checkin) {  // if block required since checkin could be null
			checkin.checkout = Date.now()
			try {
				await checkin.save()	
			} catch (err) {
				console.log("error saving to DB: ", err)
				return res.status(404).json({success: false, err: err})
			}
		}
	})
	res.status(200).json({success: true})
}

module.exports = {
	getDesks, postDesk, putDesk, deleteDesk, checkin, checkout
}