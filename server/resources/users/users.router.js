const express = require("express")
const { loggedIn } = require("../../middlewares/loggedIn")
const { getUsers } = require("./users.controllers")
const router = express.Router()

router.get("/", loggedIn, getUsers)

module.exports = router