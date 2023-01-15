const express = require("express");
const { TodoModel } = require("../Models/Todo.model");

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const todos = await TodoModel.find({ userID });
    res.json({ msg: "successfull", data: todos });
  } catch (e) {
    console.log(e);
    res.send({ msg: "something went wrong" });
  }
});

todoRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const todo = new TodoModel(data);
    await todo.save();
    res.send({ msg: "todo has been added" });
  } catch (e) {}
});

module.exports = { todoRouter };
