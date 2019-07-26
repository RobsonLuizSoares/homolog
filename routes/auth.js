const express = require('express')
const router = express.Router()
const loginController = require('../controllers/auth')

const User = require('../models/user')

const models = {
    User
}


router.get('/', loginController.login)

router.post('/', loginController.auth.bind(null, models))


module.exports = router