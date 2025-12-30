const express = require('express')
const router = express.Router()
const photosController = require("../controllers/photosController")

router.get("/", photosController.getAllPhotos)

router.get("/:id" , photosController.getPhotosById)

router.post("/", photosController.createPhotos)

router.put("/", photosController.updatePhotos)

router.delete("/", photosController.deletePhotos)

module.exports = router