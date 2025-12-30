const express = require('express')
const router = express.Router()
const postsController = require("../controllers/postsController")

router.get("/", postsController.getAllPosts)

router.get("/:id" , postsController.getPostsById)

router.post("/", postsController.createPosts)

router.put("/", postsController.updatePosts)

router.delete("/", postsController.deletePosts)

module.exports = router