const express = require('express')
const router = express.Router()
const todosController = require("../controllers/todosController")

router.get("/", todosController.getAllTodos)

router.get("/:id" , todosController.getTodosById)

router.post("/", todosController.createTodos)

router.put("/", todosController.updateTodos)

router.delete("/", todosController.deleteTodos)

module.exports = router