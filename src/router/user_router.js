const express = require('express')
const UserController = require('./../controller/user_controller')

const router = express.Router()

router.post("/createUser",UserController.createUser)
router.post("/sighIn",UserController.sighIn)

module.exports = router