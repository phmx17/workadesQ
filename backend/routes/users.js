const express = require('express')
const router = express.Router()

const { registerUser, validateUser } = require('../controllers/users.js')

router.post('/', registerUser)
router.post('/validate', validateUser)

module.exports = router
