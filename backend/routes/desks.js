const express = require('express')
const router = express.Router()
const jwtAuthenticator = require('../middleware/auth.js')

const { getDesks, postDesk, putDesk, deleteDesk } = require('../controllers/desks.js')

router.get('/', getDesks)
router.post('/',jwtAuthenticator ,postDesk)
router.put('/', putDesk)
router.delete('/', deleteDesk)

module.exports = router
