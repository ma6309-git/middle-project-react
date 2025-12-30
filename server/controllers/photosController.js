const Photos = require("../models/Photos");

const getAllPhotos = async (req, res) => {
  const photos = await Photos.find().lean();
  res.json(photos);
};

const getPhotosById = async (req,res) => {
    const {id} = req.params
    const photos = await Photos.findById(id).lean()
    if(!photos) return res.status(404).send("photos not found")
    res.json(photos)

}

const createPhotos = async (req,res) => {
    const {title, imageUrl } = req.body
    if(!title) return res.status(400).send("title is required")
    const photos = await Photos.create({title,imageUrl})
    if(!photos) return res.status(404).send("error while adding new photos")
    res.json(photos)
}

const updatePhotos = async (req,res) =>{
    const {id,title, imageUrl} = req.body
    if(!id || !title) return res.status(400).send("title and id ara required")
    const photos = await Photos.findById(id).exec()
    photos.title = title
    photos.imageUrl = imageUrl

    const newPhotos = await photos.save()
    res.json(`update photos ${id} success`)
}

const deletePhotos = async (req,res) => {
    const {id} = req.body
    if(!id) return res.status(400).send("id is require")
    const photos = await Photos.findById(id).exec()
    const deleted = await photos.deleteOne()
    console.log(deleted)
    res.json(`photos with id${deleted._id} is deleted`)
}

module.exports = {getAllPhotos, getPhotosById, createPhotos, updatePhotos, deletePhotos}