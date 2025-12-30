const Todos = require("../models/Todos");

const getAllTodos = async (req, res) => {
  const todos = await Todos.find().lean();
  res.json(todos);
};

const getTodosById = async (req,res) => {
    const {id} = req.params
    const todos = await Todos.findById(id).lean()
    if(!todos) return res.status(404).send("todos not found")
    res.json(todos)

}

const createTodos = async (req,res) => {
    const {title, tags } = req.body
    if(!title) return res.status(400).send("title is required")
    const todos = await Todos.create({title,tags})
    if(!todos) return res.status(404).send("error while adding new todos")
    res.json(todos)
}

const updateTodos = async (req,res) =>{
    const {id,title, tags, complete} = req.body
    if(!id || !title) return res.status(400).send("title and id ara required")
    const todos = await Todos.findById(id).exec()
    todos.title = title
    todos.tags = tags
    todos.complete = complete

    const newTodos = await todos.save()
    res.json(`update todos ${id} success`)
}

const deleteTodos = async (req,res) => {
    const {id} = req.body
    if(!id) return res.status(400).send("id is require")
    const todos = await Todos.findById(id).exec()
    const deleted = await todos.deleteOne()
    console.log(deleted)
    res.json(`todos with id${deleted._id} is deleted`)
}

module.exports = {getAllTodos, getTodosById, createTodos, updateTodos, deleteTodos}