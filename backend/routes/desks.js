const express = require('express')
const router = express.Router()

const { getDesks, postDesk, putDesk, deleteDesk } = require('../controllers/desks.js')

router.get('/', getDesks)
router.post('/', postDesk)
router.put('/', putDesk)
router.delete('/', deleteDesk)

module.exports = router
