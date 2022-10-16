const express = require('express')
const router = express.Router()
const jwtAuthenticator = require('../middleware/auth.js')

const { getDesks, postDesk, putDesk, deleteDesk, checkin, checkout } = require('../controllers/desks.js')

router.get('/', getDesks)
router.post('/', postDesk)
// router.post('/',jwtAuthenticator ,postDesk)
router.put('/', putDesk)
router.delete('/', deleteDesk)

router.post('/checkin', checkin)
router.post('/checkout', checkout)

module.exports = router
