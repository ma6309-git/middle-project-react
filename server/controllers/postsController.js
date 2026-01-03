const Posts = require("../models/Posts");

const getAllPosts = async (req, res) => {
  const posts = await Posts.find().lean();
  res.json(posts);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;
  const posts = await Posts.findById(id).lean();
  if (!posts) return res.status(404).send("posts not found");
  res.json(posts);
};

const createPosts = async (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.status(400).send("title is required");
  const posts = await Posts.create({ title, body });
  if (!posts) return res.status(404).send("error while adding new posts");
  res.json(posts);
};

const updatePosts = async (req, res) => {
  const { id, title, body } = req.body;
  if (!id || !title) return res.status(400).send("title and id ara required");
  const posts = await Posts.findById(id).exec();
  posts.title = title;
  posts.body = body;

  const newPosts = await posts.save();
  res.json(`update posts ${id} success`);
};

const deletePosts = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send("id is require");
  const posts = await Posts.findById(id).exec();
  const deleted = await posts.deleteOne();
  console.log(deleted);
  res.json(`posts with id${deleted._id} is deleted`);
};

module.exports = {
  getAllPosts,
  getPostsById,
  createPosts,
  updatePosts,
  deletePosts,
};
