const express = require('express')
const router = express.Router()
const usersController = require("../controllers/usersController")

router.get("/", usersController.getAllUsers)

router.get("/:id" , usersController.getUsersById)

router.post("/", usersController.createUsers)

router.put("/", usersController.updateUsers)

router.delete("/", usersController.deleteUsers)

module.exports = router