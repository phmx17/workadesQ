const express = require('express')
const router = express.Router()

const { registerUser, updateUser, deleteUser } = require('../controllers/auth.js')

router.post('/', registerUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

module.exports = router
