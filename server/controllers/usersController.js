const User = require("../models/Users");

const getAllUsers = async (req, res) => {
  const users = await User.find().lean();
  res.json(users);
};

const getUsersById = async (req, res) => {
  const { id } = req.params;
  const users = await User.findById(id).lean();
  if (!users) return res.status(404).send("users not found");
  res.json(users);
};

const createUsers = async (req, res) => {
  const { name, userName, email, address, phone } = req.body;
  if (!userName) return res.status(400).send("title is required");
  const users = await User.create({ name, userName, email, address, phone });
  if (!users) return res.status(404).send("error while adding new users");
  res.json(users);
};

const updateUsers = async (req, res) => {
  const { id, name, userName, email, address, phone } = req.body;
  if (!id || !userName)
    return res.status(400).send("title and id ara required");
  const users = await User.findById(id).exec();
  users.name = name;
  users.userName = userName;
  users.email = email;
  users.address = address;
  users.phone = phone;

  const newUsers = await users.save();
  res.json(`update users ${id} success`);
};

const deleteUsers = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send("id is require");
  const users = await User.findById(id).exec();
  const deleted = await users.deleteOne();
  console.log(deleted);
  res.json(`users with id${deleted._id} is deleted`);
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
};
